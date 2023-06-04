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


// Função para enviar o email com o código de confirmação
function sendInAdminEmail(order) {
  const mailOptions = {
    from: process.env.EMAIL, // Insira seu email aqui
    to: process.env.EMAIL_ADMIN, // Email do destinatário
    subject: 'Nava encomendda',
    text: `${order}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email de confirmação enviado: ' + info.response);
    }
  });
}
export {sendInAdminEmail}

