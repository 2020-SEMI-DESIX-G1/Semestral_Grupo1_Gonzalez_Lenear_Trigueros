const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const path = require('path');

const Users = require('../models/Users');
const app = express();

const Armado = require('../models/Armado');
const { find } = require('../models/Users');

router.get('/', (req, res, next) => {
  res.render('index');
});


//GET-POST DEL SIGNUP
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

//get
router.get('/Bienvenido',  (req, res,next) => {
  res.render('Bienvenido');
});

router.get('/Enviado',  (req, res,next) => {
  res.render('Enviado');
});

router.get('/Armar',  (req, res) => {
  res.render('Armar');
});

router.get('/Menu', (req, res) => {
  res.render('Menu');
});
let a =0;
let b;
let c;
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

//post
router.post('/Bienvenido', async (req, res) => {
  if(req.body.menu){
      res.redirect('/Menu');
  }
  else
  if(req.body.armar){
       res.redirect('/Armar');
  }
});

router.post('/Confirmar', (req,res) => {
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