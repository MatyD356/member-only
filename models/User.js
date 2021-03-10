const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxlength: 100 },
  lastName: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 300 },
  memberShip: { type: Boolean, require: true }
})

module.exports = mongoose.model('User', UserSchema)