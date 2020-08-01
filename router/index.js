//Constantes utilizadas para Stripe
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51HBDHNJRW1JL8d9KIaHQ2rSR9HQuUwCNvYaK9idu6Cd0rjL0eo8UJDqoMVHq9CMGI6GWxzeE6kqBeXCfHPK2QTCo00EcHgGMWU');
const createPM = require('../payments/createPaymentIntent');
const dataBaseUSER = require('./DB');
const acceptInt = require('../payments/PaymentIntentAccept');

///////////////////////////////////////
const express = require('express');
const app = express();
const router = require('express').Router();

const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const { find } = require('../models/Users');
const { userInfo } = require('os');



// require para la Base de Datos
const Users = require('../models/Users');
const Armado = require('../models/Armado');
const alimentos = require('../models/alimentos');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Variables para la tabla de detalles de la vista Enviar Pedido
let a1;
let a2;
let a3;
let a4;
let a5;
let x=0;
let x1=0;
let x2=0;
let x3=0;
let x4=0;
let precio;

//Variable que contiene el PaymentID
let payid;
let username;


let a=0;
let b;
let c;

router.get('/', (req, res, next) => {
  res.render('index');
});


//GET-POST DEL SIGNUP/SIGNIN------------------------------------------------------------------------------------------------------------->
//--------------------------------------------------------------------------------------------------------------------------------->
router.get('/signup', (req, res, next) => {
    res.render('signup');
});

//dependiendo si la autentificacion es correcta redirecciona a la pagina de inicio o lo devuelve al signup
 router.post('/signup',  passport.authenticate('local-signup', {
  successRedirect:'/Bienvenido',
  failureRedirect:'/signup',
  passReqToCallback: true
}));

//GET-POST DEL SIGNIN
  router.get('/signin', (req, res, next) => {
    res.render('signin');
  });
  
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/Bienvenido',
    failureRedirect: '/signin',
    passReqToCallback: true
}));
  
//verifica si el usuario esta autenticado o no 
//todas las rutas a partir de aqui son accesibles solo con el login
router.use((req,res,next) =>{
  isAuthenticated(req,res,next);
  next();
});

//GET--------------------------------------------------------------------------------------------->
router.get('/Bienvenido',  (req, res,next) => {

  res.render('Bienvenido');
});

router.get('/Enviado',  (req, res,next) => {
  res.render('Enviado');
});

router.get('/Armar',  (req, res) => {
  res.render('Armar');
});

router.get('/Menu', async(req, res, next) => {
  res.render('Menu');
});

router.get('/Confirmar2', async (req,res) => {
  alimentos.find(function (err, data){
    if(err){
      return console.log(err);
    }
    if(data === null){
      console.log('no hay datos');
    }
    a=data;
  })
  if(b==0)
    {
      precio = 1050;
      x=0;
      a1 = a[4].alimento;
    
      a2 = a[8].alimento;
      
      a3 = 'No';
      a4= a[13].alimento;
      a5= a[15].alimento;
      x = x + a[4].cal + a[8].cal + a[13].cal +a[15].cal;
    }
    if(b==1)
    {
      precio = 700;
      x=0;
      a1 = a[5].alimento;
      a2 = 'No'
      a3 = a[9].alimento;
      a4= a[13].alimento;
      a5= a[19].alimento;
      x = x + a[4].cal + a[5].cal + a[13].cal +a[15].cal;
    }
    if(b==2)
    {
      precio =1450;
      x=0;
      a1 = a[20].alimento;
      a2 = 'No'
      a3 = 'No'
      a4= a[2].alimento;
      a5= a[18].alimento;
      x = x + a[4].cal + a[5].cal + a[13].cal +a[15].cal;
    }
    if(b==3)
    {
      precio = 1080;
      x=0;
      a1 = a[21].alimento;
      a2 = 'No';
      a3 = a[11].alimento;
      a4= 'No';
      a5= a[17].alimento;
      x = x + a[4].cal + a[5].cal + a[13].cal +a[15].cal;
    }
    if(b==4)
    {
      precio = 0900;
      x=0;
      a1 = a[3].alimento;
      a2 = 'No';
      a3 = a[9].alimento;
      a4= 'No';
      a5= a[16].alimento;
      x = x + a[4].cal + a[5].cal + a[13].cal +a[15].cal;
    }
    if(b==5)
    {
      precio = 0890;
      x=0;
      a1 = a[0].alimento;
      a2 = 'No';
      a3 = a[10].alimento;
      a4= a[12].alimento;
      a5= a[15].alimento;
      x = x + a[4].cal + a[5].cal + a[13].cal +a[15].cal;
    }
  res.render('Confirmar2',{a1,a2,a3,a4,a5,x,precio});
  // dataBaseUSER.dataBaseUSER().then()
  payid= await createPM.active(precio,a1);
});


router.get('/Confirmar',  (req, res) => {
  Armado.find(function (err, data){
    if(err){
      return console.log(err);
    }
    if(data === null){
      console.log('no hay datos')
    }
    a =data.length;
    b=data;
    c=a-1;
  })
res.render('Confirmar', {b,a,c});
});

router.get('/profile',(req, res, next) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/signin');
});

//POST------------------------------------------------------------------------------------>
//---------------------------------------------------------------------------------------->
router.post('/Bienvenido', async (req, res) => {
  if(req.body.menu){
      res.redirect('/Menu');
  }
  else
  if(req.body.armar){
       res.redirect('/Armar');
  }
}
);

router.post('/Menu',  async (req,res) => {

    if(req.body.menu1){
      b=0;
    }
    else
    if(req.body.menu2){
      b=1
    }
    if(req.body.menu3){
      b=2
    }
    if(req.body.menu4){
      b=3
    }
    if(req.body.menu5){
      b=4
    }
    if(req.body.menu6){
      b=5
    }
    res.redirect('/Confirmar2');
// }
});

router.post('/Confirmar', (req,res) => {

  res.redirect('/Enviado');
});

router.post('/Confirmar2', async (req,res) => {
  await createPM.accept(payid);
  res.redirect('/Enviado');
});

router.post('/Armar',  (req,res,) => {
    const {carbs,menes,prote,grasa,jugo,acom}=req.body;
    Armado.create({carbs,menes,prote,grasa,jugo,acom});
    res.redirect('/Confirmar');
});

  //si el usuario esta autenticado es true y continua con la siguiente ruta, si no, es redicreccionado a la pagina principal
  function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
    }

module.exports = router;