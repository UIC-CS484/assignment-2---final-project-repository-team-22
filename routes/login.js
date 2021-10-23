var express = require('express');
var router = express.Router();
const passport = require('passport');

//Login User Route (host/login):
router.get('/', function(request, response, next) {
  let errorMessage = request.query.errorMessage;
  if(typeof errorMessage!=='undefined'){
    errorMessage = decodeURIComponent(request.query.errorMessage);
    response.render('login', {errorMessage});
  }
  else
    response.render('login');
});

//After user hits submit (host/register/submit):
router.post('/submit', function(request, response, next){
  const errorMessage = encodeURIComponent(
    "There was a problem. Please check your credentials and try again"
  );
  passport.authenticate('local', {
    failureRedirect: '/login?'+errorMessage,
    successRedirect: '/special_page'
  });
});

module.exports = router;
