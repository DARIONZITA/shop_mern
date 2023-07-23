import Order from "../models/order.model.js";
import {updateProducts} from "../servers/product.service.js"
import { addPendingOrder,removePendingOrder } from "../servers/customer.server.js";
import { sendInAdminEmail } from "../servers/sendInEmail/sendOrder.js";
import mongoose from "mongoose";
const createOrder=async(req, res)=>{
     // console.log({ detailOne });

  const post = req.body;

  // console.log(post.description[0].detailOne);

  // for errors
  let emptyFields = [];
  const {_id} = req.user

  if (!post.frete) {
    emptyFields.push("frete");
  }
  if (!post.prices) {
    emptyFields.push("price");
  }
  if (!post.prices.priceTotal) {
    emptyFields.push("priceTotal in price");
  }
  if (!post.coordinates) {
    emptyFields.push("coordinates");
  }

  //if (!post.description[0].detailOne) {
    // emptyFields.push("detailOne");
   //}
  //if (!post.description[1].detailTwo) {
    // emptyFields.push("detailTwo");
   //

  post.products.forEach((value, index) => {
    if (!value.productId) {
      emptyFields.push(`products[${index}].productId`);
    }
    if (!value.quantity) {
      emptyFields.push(`products.[${index}].quantity`);
    }
  });
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Fill in all fields.", emptyFields });
  }

  // adding data to db
  try {
   
    const orderCreated = await Order.create({
      user: _id,
      ...post
    })
    const order=await Order.findById(orderCreated._id).populate('user').populate('products.productId')
    if(!order){
      return res.status(400).send({error: "error to create,try again"})
    }
    post.products.forEach(async(value) =>{
        await updateProducts(value.productId,{ $inc: {stock: -value.quantity } })   
    })
    await addPendingOrder(_id,order._id)
    sendInAdminEmail(order)
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

const getAllOrders=async(req, res) => {
    try {
        const sortObject =
          req.query.sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 6;
        const { user, product, isDone } = req.query;
        const token = req.token ? req.token : false

        // Crie um objeto de filtro vazio inicialmente
        const filter = {};

        // Adicione as condições de filtro com base nos parâmetros de consulta
        if (user) {
        filter.user = user;
        }
        if (product) {
        filter['products.productId'] = product;
        }
        if (isDone) {
        filter.isDone = isDone === 'true';
      
        }


      
        const orderData = await Order.find(
          filter
        )
              .populate(
                {
                  path: 'products.productId',
                  model: 'Product',
                  select:'name price'
              
                }
              )
            .populate(
              {
              path: 'user',
              select: 'firstName lastName email numberPhone'      
              }
            )
          .sort(sortObject)
          .skip(page * limit)
          .limit(limit);

        const total = await Order.countDocuments(
          filter
        );
    
        const response = {
          error: false,
          isDone: filter.isDone ,
          token,
          total,
          page: page + 1,
          limit,
          orderData,
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    
}
const changeIsDone= async(req, res) =>{
  const idOrder=mongoose.Types.ObjectId(req.params.idOrder) //id order


  if (!mongoose.Types.ObjectId.isValid(idOrder)) {
    return res.status(400).json({ error: "id is not valid" });
  }
  try {
    const order = await Order.findByIdAndUpdate(idOrder,{isDone:true}, { new: true });
    if(!order){return res.status(400).json({ error: "Error, try again" });}
    await removePendingOrder(order.user,idOrder)

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}
const cancelOrder=async(req, res)=>{
  const idOrder=mongoose.Types.ObjectId(req.params.idOrder) //id order


  if (!mongoose.Types.ObjectId.isValid(idOrder)) {
    return res.status(400).json({ error: "id is not valid" });
  }
  try {
    const order = await Order.findByIdAndRemove(idOrder);
    if(!order){return res.status(400).json({ error: "Error, try again" });}
    order.products.forEach(async(value) =>{
      await updateProducts(value.productId,{ $inc: {stock: value.quantity } })   
    })    
    await removePendingOrder(order.user,idOrder)

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}


export {
    createOrder,
    getAllOrders,
    changeIsDone,
    cancelOrder
    
}