var express = require('express');
var router = express.Router();
const passport = require('passport');
const passwordUtil = require('../utils/passwordUtil');
const databaseUtil = require('../utils/databaseUtil');

//Register User Route (host/register):
router.get('/', function(request, response, next) {
  let errorMessage = request.query.errorMessage;
  if(typeof errorMessage!=='undefined'){
    errorMessage = decodeURIComponent(request.query.errorMessage);
    response.render('register', {errorMessage});
  }
  else
    response.render('register');
});

//After user hits submit (host/register/submit):
router.post('/submit', function(request, response, next){
  console.log('Inside submit');

  const email = request.body.email;
  const username = request.body.username;
  const password = request.body.password;

  //Checking if email or username already exist:
  databaseUtil.exists("email", email,
    (currentUser)=>{
      if(typeof currentUser!=='undefined'){
        const errorMessage = encodeURIComponent("There was an error.");
        console.log("Email already exists: "+email);
        response.redirect('/register?errorMessage='+errorMessage);
      }
    },
    (errorMessage)=>{
      console.error(errorMessage);
    }
  );

  databaseUtil.exists("username", username,
    (currentUser)=>{
      if(typeof currentUser!=='undefined'){
        const errorMessage = encodeURIComponent("Username already exists.");
        console.log("Username already exists: "+email);
        response.redirect('/register?errorMessage='+errorMessage);
      }
    },
    (errorMessage)=>{
      console.error(errorMessage);
    }
  );

  if(!passwordUtil.isPasswordStrong(password)){
    const errorMessage = encodeURIComponent("Password isn't strong enough");
    console.log("Weak password");
    //Probably not secure, TODO figure out a better way
    response.redirect('/register?errorMessage='+errorMessage);
  }

  //Generating userID until a new one is found (TODO):
  let userId = parseInt(Math.random()*1000000);

  const {hash, salt} = passwordUtil.hashPassword(password);

  const user = {
    userId: userId,
    email: email,
    username: username,
    hash: hash,
    salt: salt
  };

  databaseUtil.addUser(user);

  const errorMessage = encodeURIComponent(
    "There was a problem. Please try again"
  );
  passport.authenticate('local', {
    failureRedirect: '/login?errorMessage='+errorMessage,
    successRedirect: '/'
  })(request, response, next);
});

module.exports = router;
