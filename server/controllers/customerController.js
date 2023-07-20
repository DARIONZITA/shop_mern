import Customer from "../models/customerModel.js";
import {
   CustomerService,
   findInPending,
   deleteInPending,
   createCustomer,
   CustomerLoginService
  } from "../servers/customer.server.js"
import jwt from "jsonwebtoken";

// create token function. we can use this function many times
// userid + secret = token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "90d" });
};

// SIGNUP
const customerSignup = async (req, res) => {
  const { firstName, lastName, email, password, numberPhone } = req.body;

  try {
    await CustomerService(
      firstName,
      lastName,
      email,
      password,
      numberPhone
    );



    res.status(200).json({email: email});


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const customerSignupConfirm = async (req, res) =>{
  const { email, confirmationCode } = req.body;

  // Verificar se o código de confirmação é válido
  const user = await findInPending(email, confirmationCode);

  if (!user) {
    return res.status(400).json({ error: 'Código de confirmação inválido ou expirado.' });
  }

  // criar o usuário do MongoDB
  await createCustomer(
    user.firstName,
    user.lastName,
    user.email,
    user.password,
    user.numberPhone)
  const firstName=user.firstName
  const lastName=user.lastName 
  const numberPhone= user.numberPhone
  await deleteInPending(user._id)
  const token = createToken(user._id);
  res.status(200).json({ firstName,lastName,email, numberPhone, token });

  // Responder ao cliente com sucesso
  
}

// LOGIN
const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await CustomerLoginService(email, password);

    const firstName = customer.firstName;
    const lastName=customer.lastName 
    const numberPhone= customer.numberPhone
    const token = createToken(customer._id);
    console.log(customer._id)
    res.status(200).json({ firstName,lastName, email, numberPhone, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const customerUpadate = async(req,res)=>{
  
  const post = req.body;

  // for errors
  let Fields = [];

  if (post.firstName) {
    Fields.push("firstName");
  }
  if (post.lastName) {
    Fields.push("lastName");
  }
  if (post.numberPhone) {
    Fields.push("numberPhone");
  }
  

  if (Fields.length < 1) {
    return res.status(400).json({ error: "Fill in all fields.", Fields });
  }

  try {
    const user = req.user;
 
    const data = {
      ...post,
    };


    const customer = await Customer.findByIdAndUpdate(user._id, data, { new: true });

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

const MyOrders = async(req, res)=>{
  const userId= req.user
  const myOrders= await Customer.findById(userId).select('pendingOrders')
    .populate({
      path: 'pendingOrders',
      select: 'prices products',
      populate: {
        path: 'products.productId',
        model: 'Product',
        select:'name'
      }
    })

  res.send({myOrders})
}

export {
  customerSignup,
  customerSignupConfirm,
  customerLogin,
  customerUpadate,
  MyOrders
};
