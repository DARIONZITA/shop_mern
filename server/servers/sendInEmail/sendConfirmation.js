import dotenv from "dotenv";
dotenv.config()
import nodemailer from 'nodemailer';
// Configurações de email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Exemplo: Gmail, Outlook, etc.
  auth: {
    user: process.env.EMAIL, //Insira seu email aqui
    pass: process.env.PASS_EMAIL, // Insira sua senha aqui
  },
    port: 465,
    host: "smtp.gmail.com"
});

// Função para gerar um código de confirmação
function generateConfirmationCode() {
  const codeLength = 6;
  const chars = '0123456789';
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return code;
}

// Função para enviar o email com o código de confirmação
function sendConfirmationEmail(email, code) {
  const mailOptions = {
    from: process.env.EMAIL, // Insira seu email aqui
    to: email, // Email do destinatário
    subject: 'Código de confirmação',
    text: `Seu código de confirmação é: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email de confirmação enviado: ' + info.response);
    }
  });
}
export {generateConfirmationCode,sendConfirmationEmail}

