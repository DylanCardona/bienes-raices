import express from "express";

import { formularioLogin, formularioRegistro } from "../controllers/usuariosControllers.js";

const router = express.Router();

router.get("/login", formularioLogin)
router.get("/register", formularioRegistro)

export default router;