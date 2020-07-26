const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nombre: { type: String },
  direccion: { type: String },
});



const Clientes = mongoose.model('Clientes', schema);

module.exports = Clientes;
