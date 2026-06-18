import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuarios.js"

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
    //const usuarios = await Usuario.create(req.body)
    res.json(usuarios)
    
}

const formularioOlvidePassword = (req, res) => {
    res.render("auth/forgot-password", {
        tituloPagina: "Olvide la contraseña"
    });
}

export { formularioLogin, registrar, formularioRegistro, formularioOlvidePassword}