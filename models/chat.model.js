const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: mongoose.Schema.Types.ObjectId,
    message: String,
    sentDate: Date
});

module.exports = mongoose.model('Chat', chatSchema);