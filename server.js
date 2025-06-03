
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

app.get('/api/v1/saludo', (req, res) => {
  const nombre = req.query.nombre;

  if (!nombre) {
    return res.status(400).json({ mensaje: "Falta el parámetro 'nombre' en la consulta" });
  }

  res.status(200).json({ mensaje: `Hola, ${nombre}!` });
});