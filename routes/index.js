var express = require('express');
var router = express.Router();

const user_Controller = require('../controller/userController')
const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('log-in')
}
const checkNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect('/')
  return next()
}
//home page
router.get('/', checkAuth, user_Controller.index_GET);
router.post('/', checkAuth, user_Controller.update_user_POST);

//sing-up form
router.get('/sing-up', checkNotAuth, user_Controller.add_user_get);
router.post('/sing-up', checkNotAuth, user_Controller.add_user_post);

//log-in form
router.get('/log-in', checkNotAuth, user_Controller.log_user_GET)
router.post('/log-in', checkNotAuth, user_Controller.log_user_POST)

//logout
router.get('/log-out', user_Controller.log_out_user)

module.exports = router;
