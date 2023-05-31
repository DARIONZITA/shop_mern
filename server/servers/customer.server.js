import Customer from "../models/customerModel.js";
import CustomerPending from "../models/customerPending.models.js"
import bcrypt from "bcrypt";
import validator from "validator";
import {generateConfirmationCode,sendConfirmationEmail} from "./sendInEmail/sendConfirmation.js"
const CustomerService=async(
    firstName,
    lastName,
    email,
    password,
    numberPhone
)=>{
    // validation .. check if email and password inputs are empty
  if (!firstName || !lastName || !email || !password || !numberPhone ) {
    throw Error("All fields must be filled");
  }

  // validation .. check if email is a valid email
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // validation .. check if password is a strong email
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is weak");
  }

  // find the user that has the same value as the email
  // this will return the whole user document
  const emailExist = await Customer.findOne({ email });
  

  // check if the email already exist
  // users cannot have same email
  // if user tries to sign up with an email that is already exist ..
  // it throws an error
  if (emailExist) {
    throw Error("Email is already in use by another user");
  }        

  // my password = KimMinju0829
  // salt = asdc9874s4 .. this is random
  const salt = await bcrypt.genSalt(10);
  // combine the salt and password together
  // hash = KimMinju0829asdc9874s4
  // it will be a hash passowrd exmple .. $djfdjd2143n87461513
  const passwordHash = await bcrypt.hash(password, salt);
  
 
  const confirmationCode = generateConfirmationCode();

  const customerSend=await CustomerPending.signup(
    firstName,
    lastName,
    email,
    passwordHash,
    numberPhone,
    confirmationCode
  )

  sendConfirmationEmail(email, confirmationCode);
  return customerSend
}
const findInPending=(email,confirmationCode)=>CustomerPending.findOne(
    {email:email,confirmationCode:confirmationCode}
    ).select("+password")
const deleteInPending=(id)=>CustomerPending.findByIdAndDelete(id)
const createCustomer=(
    firstName,
    lastName,
    email,
    password,
    numberPhone)=>Customer.signup(
        firstName,
        lastName,
        email,
        password,
        numberPhone
    )
    const CustomerLogin=(email,password)=>Customer.login(email,password)
 export {
    CustomerService,
    findInPending,
    deleteInPending,
    createCustomer,
    CustomerLogin
}