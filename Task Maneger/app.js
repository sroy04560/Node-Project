const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const task = require('./route/task')

require('dotenv').config()

const notFound = require('./middleware/not-found')
const errFound = require('./middleware/error')

//middleware

app.use(express.static('./public'))
app.use(express.json())


//routes

app.use('/api/v1/tasks', task)

app.use(notFound)
app.use(errFound)
const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()