require('dotenv').config()
require('./passport/local-auth');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
//passport permite hacer la autentificacion y validacion 
const passport = require('passport');
const session = require('express-session');
//nos permite enviar mensaje entre paginas 
var flash = require('req-flash');

//conexion a la base de datos(constantes)
const connectDb = require('./dbConfig');
const Armado = require('./models/Armado');
const Users = require('./models/Users');
const PORT = 3000;

// Configuracion
app.set('view engine', 'pug');
app.set('views', './views');


// Intermediarios
app.use(morgan('dev'));
app.use(express.static('public'));


app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'hola2secreto',
    resave: false,
    saveUninitialized: false
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  
  
//Utiliza la rependencia req-flash para enviar valores entre paginas de manera mas facil
  app.use((req,res,next) => {

    //envia un mensaje de error si algun valor en el inicio de sesion es incorrecto
    app.locals.mensajedeinicio =  req.flash('mensajedeinicio');
    //envia un mensaje de error si el correo en el registro ya está en uso
    app.locals.mensajederegistro =  req.flash('mensajeregistro');
    app.locals.user=req.user;

    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/cont', express.static(path.join(__dirname, 'cont')));

//require donde se encuentran todas las rutas
app.use('/', require('./router/index'));

connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
});