const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  participants: {
    type: [Number],
    required: true,
  },
  blackList: {
    type: [Boolean],
    required: true,
  },
  favoriteList: {
    type: [Boolean],
    required: true,
  },
},
{
  timestamps: true,
});

const Conversation = mongoose.model('Conversation', Schema);
module.exports = Conversation;
