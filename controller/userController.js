const User = require('../models/User')

const async = require('async')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')

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
      password: req.body.password
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
                password: hashedPassword
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