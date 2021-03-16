const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');

//add new message GET
exports.add_message_GET = (req, res, next) => {
  res.render('message_add');
}
//add new message POST
exports.add_message_POST = [
  body('title', 'Add title').trim().isLength({ min: 1 }).escape(),
  body('messageBody', 'Message must have betwwen 1 and 1000 characters').trim().isLength({ min: 1, max: 1000 }),
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
exports.delete_message_GET = (req, res, next) => {
  Message.findById(req.params.id)
    .populate('author')
    .exec((err, message) => {
      if (err) return next(err)
      res.render('message_delete', { message })
    })
}
exports.delete_message_POST = (req, res, next) => {
  Message.findByIdAndDelete({ _id: req.params.id }).exec(function (err) {
    if (err) return next(err)
    res.redirect('/')
  })
}