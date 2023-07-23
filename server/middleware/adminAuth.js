import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import Customer from "../models/customerModel.js";
import { createTokenAdmin } from "../controllers/adminController.js";

const adminAuth = async (req, res, next) => {
  

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
    if(exp <= 60*60*24*7){
      req.token= createTokenAdmin(_id)
    }
    // find the user with the _id on the db
    // and only get/select the id of the user
    // attach the user id into the req
    // so that it can be accesible on other handler functions
    // this is the ser currently login
    req.user = await Admin.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    // if its tampered, throw an error
    return res.status(401).json({ error: "Request is not authorized" });
  }
};


const isAdmin = (req, res, next) => {
  if (req.user.role !== 0) {
    return res.status(401).json({ error: "must be an admin" });
  }

  next();
};

export { adminAuth, isAdmin };
