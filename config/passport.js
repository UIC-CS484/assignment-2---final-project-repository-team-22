const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const passwordUtil = require('../utils/passwordUtil');
const databaseUtil = require('../utils/databaseUtil');

const LOG_PREFIX = "passport.js:: ";

const customFields = {
  usernameField: 'username',
  passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
  console.log(LOG_PREFIX+"Trying to authenticate: "+username);
  const currentUser = databaseUtil.exists("username", username);

  if(!currentUser){ //User doesn't exist
    console.log(LOG_PREFIX+"User doesn't exist");
    return done(null, false);
  }

  const isPasswordValid = passwordUtil.validatePassword(
    password,
    currentUser.hash,
    currentUser.salt
  );

  if(isPasswordValid){
    console.log(LOG_PREFIX+"Valid password.");
    return done(null, user);
  }

  console.log(LOG_PREFIX+"Login failed, likely invalid password");
  return done(null, false);
}

const strategy = new localStrategy(customFields, verifyCallback);

module.exports = function(passport){
  passport.use(strategy);

  passport.serializeUser((user, done)=>{
    done(null, user.userId);
  });

  passport.deserializeUser((userId, done)=>{
    const currentUser = databaseUtil.exists("userId", userId);
    done(null, currentUser);
  });
}
