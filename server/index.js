require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
// const auth = require('./authController')
const {register, login, logout} = require('./authController')

const {SERVER_PORT, CONNECTION_STRING} = process.env

const app = express()

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log('Database Connected')
    })

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'super secret',
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(express.json())

//Auth
    //register
app.post('/auth/register', register)
    //login
app.post('/auth/login', login)
    //logout
app.get('/auth/logout', logout)

app.listen(SERVER_PORT, () => console.log(`Listening on PORT ${SERVER_PORT}.`))