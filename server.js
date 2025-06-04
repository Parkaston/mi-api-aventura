const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta base
app.get('/', (req, res) => {
  res.send('El server express funciona OK');
});

// Ruta /api/v1/saludo con manejo de errores
app.get('/api/v1/saludo', (req, res) => {
  const { nombre } = req.query;

  // Validamos que esté el parámetro 'nombre'
  if (!nombre) {
    return res.status(400).json({
      error: "Debe proporcionar el parámetro 'nombre' en la consulta.",
    });
  }

  // Si está el nombre, respondemos con el mensaje
  res.status(200).json({
    mensaje: `Hola, ${nombre}!`,
  });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
