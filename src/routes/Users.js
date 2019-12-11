const express = require('express')
const User = require('./../models/Users')
const auth = require('./../middleware/auth')
const router = express.Router()

//create new user
router.post('/users/newuser', async(req, res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//login
router.post('/users/login', async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//logout from single device
router.post('/users/logout', auth, async(req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((tok)=>{
            return tok.token != req.token
        })
        await req.user.save()
        res.status(200).send('goodbye, you logged out successfully!')
} 
catch (error) {
    res.status(400).send(error)
}
})
// logout from all devices
router.post('/users/logoutAll', auth, async(req, res)=>{
    try {   
        req.user.tokens = []
        await req.user.save()
        res.status(200).send('logged out from all devices successfully')
        
    } catch (error) {
        res.send(error)
    }
})
//delete user
router.delete('/users/delete', auth, async(req, res)=>{
    try { 
        await req.user.remove()
        res.status(200).send('user deleted successfully')
    } catch (error) {
        res.status(400).send('error');
        
    }
})
module.exports = router