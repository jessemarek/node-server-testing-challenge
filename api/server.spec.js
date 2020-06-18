const supertest = require('supertest')

const server = require('./server')
const db = require('../data/db-conn')

describe('server.js', () => {
    beforeAll(async () => {
        await db('users').truncate()

        await db('users').insert([
            {
                username: "ls2003",
                password: "plainText"
            },
            {
                username: "starlord",
                password: "qwerty"
            },
            {
                username: "vader99",
                password: "password"
            },
            {
                username: "teh_hitman",
                password: "oneshot"
            }
        ])
    })

    describe('GET /', () => {
        it('should respond with 200 OK', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return { api: "is up and running!" }', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual({ api: "is up and running!" })
                })
        })
    })

    describe('GET /users', () => {
        it('should respond with 200 OK', () => {
            return supertest(server)
                .get('/users')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return a list with 4 users', () => {
            return supertest(server)
                .get('/users')
                .then(res => {
                    expect(res.body).toHaveLength(4)
                })
        })
    })

    describe('POST /users', () => {
        it('should respond with 201 OK', () => {
            return supertest(server)
                .post('/users')
                .send({ username: 'noobTube', password: 'l337c0d3' })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })

        it('should return json', () => {
            return supertest(server)
                .post('/users')
                .send({ username: 'user', password: 'hardreset' })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
    })

    describe('DELETE /users', () => {
        it('should respond with 200 OK', () => {
            return supertest(server)
                .delete('/users/5')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('user should not exist in DB after del', () => {
            return supertest(server)
                .get('/users/5')
                .then(res => {
                    expect(res.status).toBe(404)
                })
        })
    })
})