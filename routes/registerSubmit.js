const express = require('express');
const router = express.Router();
const fileSystem = require('fs');
const passwordUtil = require('../utils/passwordUtil');
const databaseUtil = require('../utils/databaseUtil');

router.post('/', function(request, response, next){
  const email = request.body.email;
  const username = request.body.username;
  const password = request.body.password;

  if(!passwordUtil.isPasswordStrong(password)){
    const error = "Password isn't strong enough";
    console.log("Weak password");
    const errorMessage = "Password entered wasn't strong";
    response.render('register', errorMessage);
  }

  const userId;
  do{
    userId = Math.random()*1000000;
  }while(userExists());

  const {hash, salt} = passwordUtil.hashPassword(password);
  console.log("UserID: "+userId)
  console.log("Email: "+email);
  console.log("Username: "+username);
  console.log("Hash: "+hash);
  console.log("Salt: "+salt);

  let user = {
    id: userId,
    email: email,
    username: username,
    hash: hash,
    salt: salt
  };
  
  res.render('special_page', {username});
});

module.exports = router;
