const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  botName: {
    type: String,
    required: true,
  },
  botAvatar: {
    type: String,
    required: true,
  },
  botId: {
    type: String,
    required: true,
  },
  botTag: { // Add this field to store client.user.tag
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Bot', BotSchema);
