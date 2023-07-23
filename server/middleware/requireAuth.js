import User from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import Customer from "../models/customerModel.js";
import { createToken } from "../controllers/customerController.js";

const requireAuth = async (req, res, next) => {

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
    const { _id ,exp} = jwt.verify(token, process.env.SECRET);

    const agora = Math.floor(Date.now() / 1000)
    if(exp - agora <= 60 * 60 * 24 * 7){
      
      req.token= createToken(_id)
    }
    
    // find the user with the _id on the db
    // and only get/select the id of the user
    // attach the user id into the re
    // so that it can be accesible on other handler functions
    // this is the ser currently login
    req.user = await Customer.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    // if its tampered, throw an error
    return res.status(401).json({ error: "Request is not authorized" });
  }
};


export { requireAuth };
