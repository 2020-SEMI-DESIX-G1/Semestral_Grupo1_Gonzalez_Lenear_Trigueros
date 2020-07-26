const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const schema2 = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
});

schema2.methods.encryptPassword =  (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(2));
}

//compara la contraseña introducida por el usuario y returna un true o false
schema2.methods.comparePassword = function(password){
    bcrypt.compareSync(passwoord, this.passwoord)
}

const Users = mongoose.model('Users', schema2);

module.exports = Users;