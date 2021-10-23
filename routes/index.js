var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  const user = request.user;
  console.log(user);
  if(typeof user==='undefined')
    response.render('index');
  else
    response.render('index', {user});
});

module.exports = router;
