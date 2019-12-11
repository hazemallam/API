const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const Messages = require('./Messages')
const Replies = require('./Replies')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('Not valid emial, please try another one!')
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.includes('zxczxc') || value.includes('password')|| value.includes('pass'))
            throw new Error('Invalid Pass')
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
    
}, {timestamps: true})
//relation
userSchema.virtual('Messages', {
    ref:'Messages',
    localField:'_id',
    foreignField:'userID'
})
userSchema.virtual('Replies', {
    ref:'Replies',
    localField:'_id',
    foreignField:'userID'
})

//generate token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, 'myToken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
//check validation for login
userSchema.statics.findByCredentials = async function(email, password){
    const user = await User.findOne({email})
    if(!email)
    throw new Error('Email not found')
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
    throw new Error('password not correct, please write correct password!')
    return user
}
//encrypt password for each modify to password
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password'))
    user.password = await bcrypt.hash(user.password,9)
    next()
})
//delete relation between parent table and child when removing  the user
userSchema.pre('remove', async function(next){
    const user = this
    await Messages.deleteMany({userID:user._id})
    await Replies.deleteMany({userID:user._id})
    next()
    
    
})
const User = mongoose.model('User',userSchema)
module.exports = User