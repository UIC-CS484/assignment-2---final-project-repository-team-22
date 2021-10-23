var express = require('express');
var router = express.Router();
const passport = require(passport);

//Login User Route (host/login):
router.get('/', function(req, res, next) {
  let errorMessage = request.query.errorMessage;
  if(typeof errorMessage!=='undefined'){
    errorMessage = decodeURIComponent(request.query.errorMessage);
    response.render('login', {errorMessage});
  }
  else
    res.render('login');
});

//After user hits submit (host/register/submit):
router.post('/submit', function(request, response, next){
  
});

module.exports = router;
