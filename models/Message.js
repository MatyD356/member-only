const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  body: { type: String, required: true, maxlength: 500 },
  timeStamp: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
})

MessageSchema.virtual('date').get(() => {
  //TO DO implement better date formating
})

module.exports = mongoose.model('Message', MessageSchema)