const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    type: {
      darkMode: {
        type: Boolean,
        default: false, // Set default value for darkMode
      },
    },
    default: {
        darkMode: false
    },
  },
});

module.exports = mongoose.model('User', UserSchema);