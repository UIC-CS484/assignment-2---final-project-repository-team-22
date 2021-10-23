const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const passwordUtil = require('../utils/passwordUtil');
const databaseUtil = require('../utils/databaseUtil');

const customFields = {
  usernameField: 'username',
  passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
  const currentUser = databaseUtil.exists("username", username);

  if(!currentUser) //User doesn't exist
    return done(null, false);

  const isPasswordValid = passwordUtil.validatePassword(
    password,
    currentUser.hash,
    currentUser.salt
  );

  if(isPasswordValid)
    return done(null, user);

  return done(null, false);
}

const strategy = new localStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done)=>{
  done(null, user.userId);
});

passport.deserializeUser((userId, done)=>{
  const currentUser = databaseUtil.exists("userId", userId);
  done(null, currentUser);
});
