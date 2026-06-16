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

const formularioOlvidePassword = (req, res) => {
    res.render("auth/forgot-password", {
        tituloPagina: "Olvide la contraseña"
    });
}

export { formularioLogin, formularioRegistro, formularioOlvidePassword}