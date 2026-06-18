import nodemailer from "nodemailer"

const emailRegistro = async(datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const {email, nombre, token} = datos

    // Enviar el correo

    await transporter.sendMail({
        from: "Bienes Raices SENA <noreply@miproyecto.com>",
        to: email,
        subject: "Confirma tu cuenta de Bienes Raices SENA",
        text: "Confirma tu cuenta!",
        html: `
        <p> Hola ${nombre}, comprueba tu cuenta en Bienes Raices SENA</p>

        <p>Tu cuenta ya esta lista, solo debes confirmar en el siguiente enlace: <a href="${process.env.BACKEND_URL}:${process.env.PORT}/auth/confirmar/${token}">Confirmar cuenta</a></p>

        <p>Si no creaste la cuenta, omite este correo</p>
        `
    });
}

export {emailRegistro}