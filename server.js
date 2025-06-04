// Importamos los módulos necesarios
const express = require('express');
const connectDB = require('./db'); // Función para conectar a MongoDB
const Usuario = require('./models/Usuario'); // Modelo de usuario (mongoose)
const jwt = require('jsonwebtoken'); // Para generar y verificar tokens JWT

const app = express();
const PORT = process.env.PORT || 3000; // Puerto del servidor (usa variable de entorno o 3000 por defecto)

// Conectamos a la base de datos MongoDB
connectDB();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Ruta base para probar que el servidor funciona
app.get('/', (req, res) => {
  res.send('El server express funciona OK');
});


// Middleware de autenticación con JWT
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Captura el header Authorization
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' }); // Si no hay token, denegamos
  }

  // Verificamos el token con la clave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' }); // Si falla la verificación
    }

    req.usuario = usuario; // Guardamos el usuario decodificado en la request
    next(); // Continuamos con la ejecución
  });
}


// Endpoint con parámetros de consulta: saludo personalizado
app.get('/api/v1/saludo', (req, res) => {
  const { nombre } = req.query;

  // Si no se pasó el nombre, devolvemos error
  if (!nombre) {
    return res.status(400).json({
      error: "Debe proporcionar el parámetro 'nombre' en la consulta.",
    });
  }

  // Si está, respondemos con el mensaje
  res.status(200).json({
    mensaje: `Hola, ${nombre}!`,
  });
});


// Endpoint de login que genera un token JWT si las credenciales son válidas
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;

  // Validación fija para este ejercicio (admin/1234)
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h' // El token expira en 1 hora
    });

    return res.json({ token }); // Enviamos el token
  }

  // Si las credenciales no coinciden
  res.status(401).json({ error: 'Credenciales inválidas' });
});


// Ruta protegida que devuelve todos los usuarios almacenados (requiere token válido)
app.get('/api/v1/usuarios', autenticarToken, async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Consulta todos los documentos de la colección
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
});


// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


// Ruta para crear un nuevo usuario (no está protegida por token en este caso, se podria agregar si asi lo qusiéramos).
app.post('/api/v1/usuarios', async (req, res) => {
  try {
    const { nombre, email } = req.body;

    // Validamos que se manden ambos campos
    if (!nombre || !email) {
      return res.status(400).json({
        error: "Debe proporcionar 'nombre' y 'email'",
      });
    }

    // Creamos y guardamos el nuevo usuario en la base de datos
    const nuevoUsuario = new Usuario({ nombre, email });
    await nuevoUsuario.save();

    // Respondemos con los datos del usuario creado
    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
});
