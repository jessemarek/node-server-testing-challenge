const express = require('express')

const server = express()

const userRouter = require('../users/users-router')

server.use(express.json())

server.use('/users', userRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: "is up and running!" })
})

module.exports = server