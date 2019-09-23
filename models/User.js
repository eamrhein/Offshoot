const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  lastviewedPanel: {
    type: Schema.Types.ObjectId,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  followedRoots: {
    type: Array,
    required: false
  },
  authoredRoots: {
    type: Array,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
