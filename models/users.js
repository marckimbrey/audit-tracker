const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username:  {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  }
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User );
