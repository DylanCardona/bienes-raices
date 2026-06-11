import express from "express";

// Crear APP
const app = express();

// Definir Puerto
const PORT = 3000;

// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});