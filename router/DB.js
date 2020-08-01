require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Users = require('../models/Users');


// Configuracion
app.set('view engine', 'pug');
app.set('views', './views');


// Intermediarios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

let a;


// Controladores - Views

async function dataBaseUSER() {
  return Promise.resolved('hello');
 }
 

// async function dataBaseUSER(){
//     const usuarios = await Users.find().select('nombre');
//     return Promise.resolve(usuarios) ;
// }

// async function dataBase(){
//   const usuarios = await Users.find().select('nombre');
//   console.log(usuarios);
// }

module.exports =  {
    "dataBaseUSER": dataBaseUSER,
    
  }
