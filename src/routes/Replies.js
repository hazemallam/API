const express = require('express')
const Replies = require('./../models/Replies')
const Messages = require('./../models/Messages')
const auth = require('./../middleware/auth')
const router = express.Router()

//write replie
router.post('/replies/:id', auth, async(req, res)=>{
    const message = await Messages.findById(req.params.id)
    const replie = new Replies({...req.body, userID:req.user._id, messageID: req.params.id})
    try {
        await replie.save()
        res.status(200).send(replie)
    } catch (error) {
        res.status(400).send(error)
    }
})


//get all replies
router.get('/replies/all', async(req, res)=>{
     try {
        const replie = await Replies.find({})
        if(!replie)
        return res.status(400).send('Not found')
        res.status(200).send(replie)
    } catch (error) {
        res.status(400).send(error)
    }
})
//get all replies on specified message
router.get('/replies/:id', async(req, res)=>{
    try {
        const replie = await Replies.find({messageID:req.params.id})
        if(!replie)
        return res.status(400).send('Not found')
        res.status(200).send(replie)
    } catch (error) {
        res.status(400).send(error)
    }
})

//edit replie
router.patch('/replies/:id', async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['body']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation)
    return res.status(400).send('Invalid updates')
    try {
        const replie = await Replies.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!replie)
        return res.status(400).send('Not found')
        res.status(200).send(replie)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete replie
router.delete('/replies/:id', async(req, res)=>{
    try {
        const replie = await Replies.findByIdAndDelete(req.params.id)
        if(!replie)
        return res.status(400).send('Not found')
        res.status(200).send(replie)
    } catch (error) {
        res.status(400).send(error)
    }
})

//get single replie
router.get('/replies/:id', async(req, res)=>{
    const _id = req.params.id
    try {
        const replie = await Replies.findById(_id)
        if(!replie)
        return res.status(400).send('Not found')
        res.status(200).send(replie)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router