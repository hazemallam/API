const express = require('express')
const Message = require('./../models/Messages')
const auth = require('./../middleware/auth')
const router = express.Router()

//write message
router.post('/messages', auth, async(req, res)=>{
    const message = new Message({... req.body, userID:req.user._id})
    try {
        await message.save()
        res.status(200).send(message)
    } catch (error) {
        res.status(400).send(error)
    }
})

//get all messages
router.get('/messages', async(req, res)=>{
    try {
        const message = await Message.find({})
        if(!message)
        return res.status(400).send('Not found')
        res.status(200).send(message)
    } catch (error) {
        res.status(400).send(error)
    }
})

//edit message
router.patch('/messages/:id', async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['body']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation)
    return res.status(400).send('Invalid updates')
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!message)
        return res.status(400).send('Not found')
        res.status(200).send(message)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete message
router.delete('/messages/:id', async(req, res)=>{
    try {
        const message = await Message.findByIdAndDelete(req.params.id)
        if(!message)
        return res.status(400).send('Not found')
        res.status(200).send('message deleted successfully!')
    } catch (error) {
        res.status(400).send(error)
    }
})

//get single message
router.get('/messages/:id', async(req, res)=>{
    const _id = req.params.id
    try {
        const message = await Message.findById(_id)
        if(!message)
        return res.status(400).send('Not found')
        res.status(200).send(message)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router