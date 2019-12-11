const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const Message = require('../models/Messages')
const adminAuth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'myToken')
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token})
        if(!user)
        throw new Error('unauthorized')
        req.token = token
        req.user =  user
        next()

    }
    catch(e){
        res.send({error: 'unauthorized'})

    }
}
module.exports = adminAuth