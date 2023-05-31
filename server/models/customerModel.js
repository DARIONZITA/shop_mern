import mongoose from "mongoose"
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  numberPhone: {
    type: Number,
    required: true,
    unique:true 
  },
  
});

// signup static method
customerSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  numberPhone
) {
 
  const customer = await this.create({
    firstName,
    lastName,
    email,
    password,
    numberPhone
  });

  return customer;
};

// login static method
customerSchema.statics.login = async function (email, password) {
  // validation .. check if email and password inputs are empty
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // find the user that has the same value as the email
  // this will return the whole user document
  const customer = await this.findOne({ email });

  // check if the email doesn't exist
  // if user tries to log in with an email that doesnt exist or incorrect ..
  // it throws an error
  if (!customer) {
    throw Error("Email doesn't exist or Incorrect Email");
  }

  // macthing the password
  // password from user types in login form and password from the database
  // bcrypt will return true (match) or false (not match)
  const match = await bcrypt.compare(password, customer.password);

  // check if it doesnt match
  if (!match) {
    throw Error("Password doesn't exist or Incorrect Password");
  }

  // if it is match then return the user document
  return customer;
};
const Customer=mongoose.model("Customer", customerSchema);
export default Customer
