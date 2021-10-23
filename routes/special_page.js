const express = require('express');
const router = express.Router();

router.get('/', function(request, response, next){
  let user = request.user;
  console.log("Current User: "+user);
  response.render('special_page', {user});
});

module.exports = router;
