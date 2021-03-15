const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  body: { type: String, required: true, maxlength: 1000 },
  timeStamp: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
})

MessageSchema
  .virtual('date')
  .get(function () {
    //TO DO implement better date formating
    return `${this.timeStamp.toLocaleString()}`
  })

module.exports = mongoose.model('Message', MessageSchema)