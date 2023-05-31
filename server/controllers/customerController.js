import {
   CustomerService,
   findInPending,
   deleteInPending,
   createCustomer,
   CustomerLogin
  } from "../servers/customer.server.js"
import jwt from "jsonwebtoken";

// create token function. we can use this function many times
// userid + secret = token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// SIGNUP
const customerSignup = async (req, res) => {
  const { firstName, lastName, email, password, numberPhone } = req.body;

  try {
    const customer = await CustomerService(
      firstName,
      lastName,
      email,
      password,
      numberPhone
    );

    const customerfirstName = customer.firstName;

    res.status(200).json({ message: `Enviado o código de confirmação para o ${email}` });


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

  await deleteInPending(user._id)
  res.send(201)

  // Responder ao cliente com sucesso
  
}

// LOGIN
const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await CustomerLogin(email, password);

    const customerfirstName = customer.firstName;

    const token = createToken(customer._id);

    res.status(200).json({ customerfirstName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  customerSignup,
  customerSignupConfirm,
  customerLogin,
};
