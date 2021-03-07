var express = require('express');
var router = express.Router();

const user_Controller = require('../controller/userController')

//home page
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//sing-up form
router.get('/sing-up', user_Controller.add_user_get);
router.post('/sing-up', user_Controller.add_user_post);

//log-in form
router.get('/log-in', user_Controller.log_user_GET)
router.post('/log-in', user_Controller.log_user_POST)

module.exports = router;
