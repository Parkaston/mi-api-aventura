const express = require('express');
const connectDB = require('./db');
const Usuario = require('./models/Usuario');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON (por si hacés POST después)
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('El server express funciona OK');
});

// Ruta /api/v1/saludo
app.get('/api/v1/saludo', (req, res) => {
  const { nombre } = req.query;

  if (!nombre) {
    return res.status(400).json({
      error: "Debe proporcionar el parámetro 'nombre' en la consulta.",
    });
  }

  res.status(200).json({
    mensaje: `Hola, ${nombre}!`,
  });
});

// Ruta /api/v1/usuarios
app.get('/api/v1/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.post('/api/v1/usuarios', async (req, res) => {
  try {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({
        error: "Debe proporcionar 'nombre' y 'email'",
      });
    }

    const nuevoUsuario = new Usuario({ nombre, email });
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
});