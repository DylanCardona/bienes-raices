import express from "express";

import { formularioLogin, registrar, confirmar, formularioRegistro, formularioOlvidePassword } from "../controllers/usuariosControllers.js";

const router = express.Router();

router.get("/login", formularioLogin)
router.get("/register", formularioRegistro)
router.post("/register", registrar)
router.get("/confirmar/:token", confirmar)
router.get("/forgot-password", formularioOlvidePassword)


export default router;