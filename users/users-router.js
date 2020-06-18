const router = require('express').Router()

const Users = require('./users-model')

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            if (users.length) {
                res.status(200).json(users)
            }
            else {
                res.status(404).json({ message: 'no users found' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Users.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(users)
            }
            else {
                res.status(404).json({ message: 'user with that id not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
})

module.exports = router