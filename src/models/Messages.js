const mongoose = require('mongoose')
const Users = require('./Users')
const Replies = require('./Replies')
const messageSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {timestamps: true})

//relation
messageSchema.virtual('Replies', {
    ref:'Replies',
    localField:'_id',
    foreignField:'messageID'
})



const Messages = mongoose.model('Messages', messageSchema)
module.exports = Messages