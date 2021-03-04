var express = require('express');
var router = express.Router();

const user_Controller = require('../controller/userController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET sing-up form
router.get('/sing-up', user_Controller.add_user);

module.exports = router;
