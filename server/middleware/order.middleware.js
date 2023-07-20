import Admin from "../models/adminModel.js";
import Customer from "../models/customerModel.js";
import jwt from "jsonwebtoken";

const orderAuth = async (req, res, next) => {

  //if (req.method === "GET") {
    //return next();
  //}

  // authorization contains the token
  const { authorization } = req.headers;


  // checks if there is a value
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is rerquired" });
  }

  // gets the token
  // authorization looks like this = "Bearer hsueudjahq.jduteu.djdjwu"
  // Bearer + Token .. we split it into two and only take the token
  const token = authorization.split(" ")[1];

  try {
    // verify the token to make sure its not tampered
    // token + secret
    // then get the _id from the token
    const { _id } = jwt.verify(token, process.env.SECRET);
    
    const isAdmin = Admin.findById({_id})

    if(!isAdmin){    
        const user = await Customer.findOne({ _id });
        const {idOrder}=req.params
        const isAuth = user.pendingOrders.some((id)=>id == idOrder)
        if(!isAuth){
            return res.status(401).json({ error: "Não autorizadado" });
        }
        next()       
    }

    next();
  } catch (error) {
    console.log(error);
    // if its tampered, throw an error
    return res.status(401).json({ error: "Request is not authorized" });
  }
};


export { orderAuth };
