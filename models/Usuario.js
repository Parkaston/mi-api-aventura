const mongoose = require('mongoose');
//Creamos un esquema para el modelo usuario, por ahora lo vamos a mantener simple hasta que el ejercicio requiera más campos
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
