
const express = require('express');

// Crea una instancia de la app
const app = express();

// Define el puerto
const PORT = process.env.PORT || 3000;

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('El server express funciona OK');
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default function handler(req, res) {
  const { nombre } = req.query;

  // Validamos que este el parametro nombre, si no estuviese mandamos un error
  if (!nombre) {
    return res.status(400).json({
      error: "Debe proporcionar el parámetro 'nombre' en la consulta.",
    });
  }

  // Si está el nombre, mandamos un mensaje mencionándolo
  res.status(200).json({
    mensaje: `Hola, ${nombre}!`,
  });
}