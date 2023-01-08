import { createTransport } from "nodemailer";

export async function enviarEmailRegistro(newUser) {
  const ADM_EMAIL = "otha.hermiston@ethereal.email";
  const USER_EMAIL = "otha.hermiston@ethereal.email";

  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: ADM_EMAIL,
      pass: "ERx1nJ74QuHM36zqPY",
    },
  });

  const mailOptions = {
    from: "ECOMMERCE",
    to: ADM_EMAIL,
    subject: "NUEVO REGISTRO",
    html: `
    <h1 style="color: blue;">REGISTRO EXITOSO, NUEVO USUARIO EN 
    <span style="color: green;">ECOMMERCE</span>
    </h1>
    <p>DATOS DEL USUARIO</p>
    <p>EMAIL: ${newUser.email}</p>
    <p>NOMBRE: ${newUser.nombre}</p>
    <p>DIRECCION: ${newUser.direccion}</p>
    <p>EDAD: ${newUser.edad}</p>
    <p>CONTACTO: ${newUser.contacto}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(err);
  }
}

export async function enviarEmailCompra(email, carrito) {
  const USER_EMAIL = "otha.hermiston@ethereal.email";

  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: USER_EMAIL,
      pass: "ERx1nJ74QuHM36zqPY",
    },
  });

  const mailOptions = {
    from: "ECOMMERCE",
    to: USER_EMAIL,
    subject: "COMPRA EXITOSA",
    html: `
    <h1 style="color: blue;">COMPRA EXITOSA DE USUARIO: ${email}
    </h1>
    <p>
    <span style="color: green;">DETALLE DE COMPRA:</span>
    </p>
    <p>${carrito}</p>??
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(err);
  }
}
