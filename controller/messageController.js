const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');

//add new message GET
exports.add_message_GET = (req, res, next) => {
  res.render('message_add');
}
//add new message POST
exports.add_message_POST = [
  body('title', 'Add title').trim().isLength({ min: 1 }).escape(),
  body('messageBody', 'Add message').trim().isLength({ min: 1, max: 500 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req)

    const draft = new Message({
      title: req.body.title,
      body: req.body.messageBody,
      author: req.user
    })
    if (!errors.isEmpty()) {
      res.render('message_add', { errors: errors.array(), draft })
    } else {
      draft.save((err) => {
        if (err) { return next(err) }
        res.redirect('/')
      })
    }
  }
]