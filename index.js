import express from "express";
import usuariosRouter from "./routes/usuariosRoutes.js"

// Crear APP
const app = express();

// Habilitar Pug
app.set("view engine", "pug")
app.set("views", "./views")

// Definir Puerto
const PORT = 3000;

//Definir la ruta publica
app.use(express.static("public"))

// Rutas
app.use("/auth", usuariosRouter)

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});