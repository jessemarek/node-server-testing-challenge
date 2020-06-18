const db = require('../data/db-conn')

module.exports = {
    find,
    findById
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id }).first()
}