var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (request, response, next)=>{
  request.logout();
  response.redirect('/');
});

module.exports = router;
