require('dotenv').config()

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
var flash        = require('req-flash');

require('./passport/local-auth');
const connectDb = require('./dbConfig');
const Clientes = require('./models/Clientes');
const Users = require('./models/Users');

const PORT = 3000;


// Configuracion
app.set('view engine', 'pug');
app.set('views', './views');


// Intermediarios
app.use(morgan('dev'));


app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'hola2secreto',
    resave: false,
    saveUninitialized: false
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use((req,res,next) => {
    app.locals.mensajedeinicio =  req.flash('mensajedeinicio');
    app.locals.mensajederegistro =  req.flash('mensajeregistro');
    app.locals.user=req.user;

    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/cont', express.static(path.join(__dirname, 'cont')));
app.use('/', require('./router/index'));


// Controladores - Views

//View de inicio


//View de Pantalla 2 Bienvenidos
app.get('/Bienvenido/:id', async (req, res) => {
    try {
        const cliente = await Clientes.findById(req.params.id).select('nombre direccion');
        res.render('Bienvenido', { cliente });
    } catch (error) {
        console.log(error);
        throw error;
    }
});

// app.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     await Users.create({ email, password });

//     const users = await Users.find().select('nombre ');
//     console.log(users[0]._id);
//     res.send('recibido');
// });

//Agregar Nombre 
app.post('/Inicio', async (req, res) => {
    const { nombre, direccion } = req.body;
    await Clientes.create({ nombre, direccion });

    const clientes = await Clientes.find().select('nombre direccion');
    console.log(clientes[0]._id);
    res.redirect('/Bienvenido/'+ clientes[0]._id);
});


//Modificar
app.post('/Bienvenido/:id', async (req, res) => {
    const id = req.params.id
    if(req.body.menu){
        res.redirect('/Menu/'+id);
    }
    else
    if(req.body.armar){
         res.redirect('/Menu/'+id);
    }
});

app.get('/Menu/:id', async (req, res) => {

    try {
        const cliente = await Clientes.findById(req.params.id).select('nombre direccion');
        res.render('Menu', { cliente });
    } catch (error) {
        console.log(error);
        throw error;
    }
});

app.get('/armar/:id', async (req, res) => {
    try {
        const cliente = await Clientes.findById(req.params.id).select('nombre direccion');
        res.render('Armar', { cliente });
    } catch (error) {
        console.log(error);
        throw error;
    }
});


// Controladores - API
app.get('/api/estudiantes/', async (req, res) => {
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.json({
        estudiantes,
        cantidad: estudiantes.length
    });
});
app.post('/api/estudiantes/', async (req, res) => {
    const { nombre, edad } = req.body;
    await Estudiantes.create({ nombre, edad });
    res.json({ nombre, edad });
});
app.get('/api/estudiantes/:id', async (req, res) => {
    try {
       
        const estudiantes = await Estudiantes.findById(req.params.id).select('nombre edad');
        res.json({estudiantes});
    } catch (error) {
        console.log(error);
        
        res.json({});
    }
});

app.put('/api/estudiantes/:id', async (req, res) => {

    const { nombre, edad } = req.body;
    await Estudiantes.findByIdAndUpdate(req.params.id, { nombre, edad });
    res.json({ nombre, edad });

    });

app.delete('/api/estudiantes/:id' ,async (req ,res) => {
    await Estudiantes.findByIdAndDelete(req.params.id);
    res.send('eliminado');
}); 
    


connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
});