const db = require('../data/db-conn')

module.exports = {
    add,
    find,
    findById,
    remove
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id')

    return findById(id)
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id }).first()
}

function remove(id) {
    return db('users').where({ id }).del()
}