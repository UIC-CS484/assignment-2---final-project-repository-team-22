var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/logout', (request, response, next)=>{
  request.logout();
  response.redirect('/');
});

module.exports = router;
