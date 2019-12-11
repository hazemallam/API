const express = require('express')
const cors = require('cors')
//db
require('./db/mongoose')
//routes
const userRouter = require('./routes/Users')
const messageRouter = require('./routes/Messages')
const replieRoutes = require('./routes/Replies')
//app
const app = express()
app.use(cors())
port = process.env.PORT || 5000
app.use(express.json())
//use routes
app.use(userRouter)
app.use(messageRouter)
app.use(replieRoutes)
app.listen(port, ()=>{
    console.log(`server is up on port ${port}`)
})