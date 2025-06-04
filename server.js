// Importamos los módulos necesarios
const express = require('express');
const connectDB = require('./db'); 
const Usuario = require('./models/Usuario'); 
const jwt = require('jsonwebtoken'); 
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const PORT = process.env.PORT || 3000; // Puerto del servidor (usa variable de entorno o 3000 por defecto)

// Conectamos a la base de datos MongoDB
connectDB();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Middleware para documentar la API con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta base para probar que el servidor funciona
app.get('/', (req, res) => {
  res.send('El server express funciona OK');
});

// Middleware de autenticación con JWT
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }

    req.usuario = usuario;
    next();
  });
}

// Endpoint con parámetros de consulta: saludo personalizado
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

// Endpoint de login que genera un token JWT
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.json({ token }); // ✅ Ahora sí está bien cerrado
  }

  res.status(401).json({ error: 'Credenciales inválidas' });
});

// Ruta protegida que devuelve todos los usuarios (requiere token)
app.get('/api/v1/usuarios', autenticarToken, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
});

// Ruta para crear un nuevo usuario (no protegida por token)
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

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
