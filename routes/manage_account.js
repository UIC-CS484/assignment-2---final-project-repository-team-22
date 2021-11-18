var express = require('express');
var router = express.Router();
const passport = require('passport');
const passwordUtil = require('../utils/passwordUtil');
const databaseUtil = require('../utils/databaseUtil');

//Manage Account Route (host/manage_account):
router.get('/', function(request, response, next) {
  let errorMessage = request.query.errorMessage;

  //Checking if user is logged in:
  const user = request.user;
  if(typeof user === 'undefined'){
    errorMessage = "You need to login to access that page."
    response.render('login', {errorMessage});
  }

  if(typeof errorMessage!=='undefined'){
    errorMessage = decodeURIComponent(request.query.errorMessage);
    response.render('manage_account', {errorMessage});
  }
  else
    response.render('manage_account');
});

//After user hits submit (host/register/submit):
router.post('/changePassword', function(request, response, next){
  console.log('Inside Change Password');

  //Checking if user is logged in:
  const user = request.user;
  if(typeof user === 'undefined'){
    errorMessage = encodeURIComponent("You need to login to access that page.");
    response.redirect('/login?errorMessage='+errorMessage);
  }

  const current_password = request.body.current_password;
  const new_password = request.body.password;

  //Checking if new password is strong:
  if(!passwordUtil.isPasswordStrong(new_password)){
    const errorMessage = encodeURIComponent("New password is weak.");
    response.redirect('/manageAccount?errorMessage='+errorMessage);
  }

  //Checking if current password is correct:
  if(!passwordUtil.validatePassword(current_password, user.hash, user.salt)){
    const errorMessage = encodeURIComponent("Current password is incorrect.");
    response.redirect('/manageAccount?errorMessage='+errorMessage);
  }

  const hashAndSalt = passwordUtil.hashPassword(new_password);
  databaseUtil.updateUser("password", hashAndSalt, user.userId,
    ()=>{
      const message = encodeURIComponent("Password updated successfully.");
      response.redirect('/manageAccount?errorMessage='+message);
    },
    (error)=>{
      const errorMessage = encodeURIComponent("An unexpected error occured").
      response.redirect('/manageAccount?errorMessage='+errorMessage);
    }
  );

});

router.post('/deleteAccount', function(request, response, next){
  console.log("Inside delete account");

  //Checking if user is logged in:
  const user = request.user;
  if(typeof user === 'undefined'){
    const errorMessage = encodeURIComponent("You need to login to access that page.");
    response.redirect('/login?errorMessage='+errorMessage);
  }

  const password = request.body.password;
  //Checking if current password is correct:
  if(!passwordUtil.validatePassword(password, user.hash, user.salt)){
    const errorMessage = encodeURIComponent("Current password is incorrect.");
    response.redirect('/manageAccount?errorMessage='+errorMessage);
  }

  databaseUtil.deleteUser(user.userId,
    () => {
      response.redirect('/logout');
    },
    (error) => {
      const errorMessage = encodeURIComponent("An unexpected error occured.");
      response.redirect('/manageAccount?errorMessage='+errorMessage);
    }
  );
});

module.exports = router;
