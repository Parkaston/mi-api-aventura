
const express = require('express');

// Crea una instancia de la app
const app = express();

// Define el puerto
const PORT = 3000;

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('El server express funciona OK');
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
