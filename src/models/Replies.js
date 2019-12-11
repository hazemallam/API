const mongoose = require('mongoose')
const replieSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    messageID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Messages'
    }
}, {timestamps: true})



const Replies = mongoose.model('Replies', replieSchema)
module.exports = Replies
