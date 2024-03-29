import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

// create token function. we can use this function many times
// userid + secret = token
export const createTokenAdmin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "60d" });
};

// SIGNUP
const adminSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.signup(email, password);

    const token = createTokenAdmin(admin._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);

    const token = createTokenAdmin(admin._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  adminSignup,
  adminLogin,
};
