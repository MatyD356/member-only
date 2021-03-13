const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Message = require('../models/Message');
//home page GET
exports.index_GET = (req, res, next) => {
  Message.find({}).populate('author').exec((err, messages_list) => {
    if (err) return next(err);
    res.render('index', { messages: messages_list });
  })
}

//home page update POST
exports.update_user_POST = [
  body('membershipPassword').trim().escape(),
  (req, res, next) => {
    let membership = null;
    if (req.body.membershipPassword === 'secret') {
      membership = 'member'
    } else if (req.body.membershipPassword === 'super') {
      membership = 'admin'
    }
    console.log(req.user._id);
    User.findByIdAndUpdate({ _id: req.user._id }, { membership }, { new: true }, (err) => {
      if (err) return next(err)
      res.redirect('/');
    })
  }]

//display sing-up new user form on GET
exports.add_user_get = (req, res) => {
  res.render('sing-up')
}

//handle sing-up new user POST
exports.add_user_post = [
  body('firstName', 'first name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('lastName', 'last name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('email', 'provide a proper email').trim().isEmail().escape(),
  body('password', 'provide a password that is 5 charactesrs long').trim().isLength({ min: 5 }).escape(),
  body('passwordConfrim', 'passwords do not match').custom((value, { req }) => value === req.body.password),
  (req, res, next) => {
    const errors = validationResult(req)
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      membership: 'user'
    })

    if (!errors.isEmpty()) {
      res.render('sing-up', { errors: errors.array(), newUser })
    } else {
      User.findOne({ 'email': req.body.email })
        .exec((err, found_User) => {
          if (err) return next(err)
          if (found_User) {
            res.render('sing-up', { errors: [{ msg: 'email is already in use' }] })
          } else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
              const userToSave = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                membership: 'user',
              })
              userToSave.save((err) => {
                if (err) return next(err)
                res.redirect('/')
              })
            })
          }
        })
    }
  }
]

//handle log-in GET
exports.log_user_GET = (req, res) => {
  res.render('log-in')
}
//handle log-in POST
exports.log_user_POST = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
  failureFlash: true
})
//handle user log-out
exports.log_out_user = (req, res) => {
  req.logout();
  res.redirect('/log-in')
}