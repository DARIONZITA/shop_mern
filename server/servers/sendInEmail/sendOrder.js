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
    subject: "Nava encomenda",
    text: `O usuário de nome ${order.user.firstName} ${order.user.lastName}
      Com E-mail ${order.user.email}
      Número de telefone ${order.user.numberPhone}
      Pretende ser contactado por ${order.contact},
      Faz a encomenda dos seguistes produtos ${order.products.map((value) =>`${value.productId.name}______${value.quantity},`)} 
      Tem como coordenada (x,y) (${order.coordinates[0]},${order.coordinates[1]}) Localizado em ${order.coordinates[2]}
      Portanto o valor do frete é de ${order.frete}kz e o valor total da encomenda é de ${order.prices.priceTotal}kz
      Ele quer que a entrega seja feita no dia ${order.orderDate.getDate()} de ${order.orderDate.getMonth()+1} de ${order.orderDate.getFullYear()}`,
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

