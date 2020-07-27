const router = require('express').Router();
const passport = require('passport');


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
  });

//dependiendo si la autentificacion es correcta redirecciona a la pagina de inicio o lo devuelve al signup
 router.post('/signup',  passport.authenticate('local-signup', {
  successRedirect:'/profile',
  failureRedirect:'/signup',
  passReqToCallback: true
}));

  router.get('/signin', (req, res, next) => {
    res.render('signin');
  });
  
  
  router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
  }));
  
  
  //verifica si el usuario esta autenticado o no 
  router.use((req,res,next) =>{
    isAuthenticated(req,res,next);
    next();
  });

  router.get('/profile',(req, res, next) => {
    res.render('profile');
  });

  router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  });

  //si el usuario esta autenticado es true y continua con la siguiente ruta, si no, es redicreccionado a la pagina principal
  function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }

  
module.exports = router;