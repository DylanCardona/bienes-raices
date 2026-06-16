import express from "express";
import usuariosRouter from "./routes/usuariosRoutes.js"
import db from "./config/db.js"

// Crear APP
const app = express();

// Habilitar Pug
app.set("view engine", "pug")
app.set("views", "./views")

// Conexion a DB
try{
  await db.authenticate()
  console.log("La conexion es exitosa")
} catch (error) {
  console.error("No se puede conectar", error)
}

// Definir Puerto
const PORT = process.env.PORT || 3000;

//Definir la ruta publica
app.use(express.static("public"))

// Rutas
app.use("/auth", usuariosRouter)

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});