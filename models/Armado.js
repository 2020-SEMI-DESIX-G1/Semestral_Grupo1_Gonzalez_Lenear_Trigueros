const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  carbs: { type: String },
  menes:{type:String},
  prote: { type: String },
  grasa: { type: String },
  jugo: { type: String },
  acom: { type: String }
});



const Armado = mongoose.model('Armado', schema);

module.exports = Armado;
