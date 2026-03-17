const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    from: String,
    to: String,
    msg: String,
    createdAt: {
            type: Date,
            default: Date.now
        }})

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;