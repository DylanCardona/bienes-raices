import express from "express";

import { formularioLogin, registrar, formularioRegistro, formularioOlvidePassword } from "../controllers/usuariosControllers.js";

const router = express.Router();

router.get("/login", formularioLogin)
router.get("/register", formularioRegistro)
router.post("/register", registrar)
router.get("/forgot-password", formularioOlvidePassword)


export default router;