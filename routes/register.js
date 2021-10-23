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

  //Checking if email or username already exist (TODO):
  if(databaseUtil.exists("email", email)){
    //Probably shouldn't display "Email exists" for privacy reasons
    //TODO/Question: Figure out a way to provide a better experience while ensuring privacy
    const errorMessage = "There was an error.";
    console.log("Email already exists: "+email);
    response.redirect('/register?errorMessage='+errorMessage);
  }
  else if(databaseUtil.exists("username", username)){
    const errorMessage = "Username already exists try a new one";
    console.log("Username already exists: "+username);
    response.redirect('/register?errorMessage='+errorMessage);
  }
  else if(!passwordUtil.isPasswordStrong(password)){
    const errorMessage = encodeURIComponent("Password isn't strong enough");
    console.log("Weak password");
    //Probably not secure, TODO figure out a better way
    response.redirect('/register?errorMessage='+errorMessage);
  }
  else{
    //Generating userID until a new one is found (TODO):
    let userId;
    do{
      userId = parseInt(Math.random()*1000000);
    }while(databaseUtil.exists("userId", userId));

    const {hash, salt} = passwordUtil.hashPassword(password);

    const user = {
      userId: userId,
      email: email,
      username: username,
      hash: hash,
      salt: salt
    };

    databaseUtil.addUser(user);

    console.log("Yup");

    const errorMessage = encodeURIComponent(
      "There was a problem. Please check your credentials and try again"
    );
    passport.authenticate('local', {
      failureRedirect: '/register?'+errorMessage,
      successRedirect: '/special_page'
    });
  }
});

module.exports = router;
