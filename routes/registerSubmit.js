const express = require('express');
const router = express.Router();
const fileSystem = require('fs');
const passwordUtil = require('../utils/passwordUtil');

router.post('/', function(request, response, next){
  const email = request.body.email;
  const username = request.body.username;
  const password = request.body.password;

  if(!passwordUtil.isPasswordStrong(password)){
    const error = "Password isn't strong enough";
    console.log("Weak password");
  }
  else{
    const {hash, salt} = passwordUtil.hashPassword(password);
    console.log("Email: "+email);
    console.log("Username: "+username);
    console.log("Hash: "+hash);
    console.log("Salt: "+salt);
  }
});

module.exports = router;
