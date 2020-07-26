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
  
  
  router.post('/signin',);

  router.get('/profile',(req, res, next) => {
    res.render('profile');
  });

  
module.exports = router;