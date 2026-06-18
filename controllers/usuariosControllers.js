import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuarios.js"
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        autenticado: true,
        tituloPagina: "Inicio de Sesión"
    });
};

const formularioRegistro = (req, res) => {
    res.render("auth/register", {
        tituloPagina: "Formulario de Registro"
    });
}

const registrar = async(req, res) => {
    //Validaciones
    await check("nombre")
        .notEmpty()
        .withMessage("El nombre no puede estar vacio")
        .run(req)

    await check("email")
        .isEmail()
        .withMessage("Ingrese un correo valido")
        .run(req)

    await check("password")
        .isLength({ min: 6})
        .withMessage("La contraseña debe tener minimo 6 caracteres")
        .run(req)

    await check("repeat_password")
        .equals(req.body.password)
        .withMessage("La contraseña no es igual")
        .run(req)
    
    // Verificar que el resultado no este vacio
    let resultado = validationResult(req)
    console.log(resultado.array())

    if(!resultado.isEmpty()) {
        // Errores
        return res.render("auth/register", {
            tituloPagina: "Formulario de Registro",
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Extraer datos
    const {nombre, email, password } = req.body

    //Validar si el correo existe
    const existeUsuario = await Usuario.findOne({where: {email}})
    if (existeUsuario){
        return res.render("auth/register", {
            tituloPagina: "Formulario de Registro",
            errores: [{ msg: "El usuario ya existe"}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    //Este es el comando que crea la cuenta
    const usuarios = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId(),
    })

    res.render("templates/mensaje" , {
        tituloPagina: "Cuenta creada",
        mensaje: "La cuenta ha sido creada, Verifica tu correo para validar la cuenta!"
    })

    // Enviar correo
    emailRegistro({
        nombre: usuarios.nombre,
        email: usuarios.email,
        token: usuarios.token
    })
    
}

const confirmar= async(req,res) => {
    const {token} = req.params
    console.log(token)

    //Validar el token si existe
    const usuario = await Usuario.findOne({where: {token}})
    console.log(usuario)

    // Confirmar la cuenta
    if(!usuario) {
        return res.render("auth/confirmar",{
            tituloPagina: "Cuenta confirmada",
            mensaje: "Hubo un error al confirmar la cuenta",
            error: true
        })
    }

    // Valida la informacion y lo manda a DB.

    usuario.token = null
    usuario.confirmado = true

    await usuario.save()

    res.render("auth/confirmar", {
        tituloPagina: "Cuenta confirmada",
        mensaje: "La cuenta se confirmo"
    })
}

const formularioOlvidePassword = (req, res) => {
    res.render("auth/forgot-password", {
        tituloPagina: "Olvide la contraseña"
    });
}

export { formularioLogin, registrar, confirmar, formularioRegistro, formularioOlvidePassword}