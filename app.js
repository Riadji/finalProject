const express       = require('express')
const session       = require('express-session')
const routerHome    = require('./routers/home')
const routerStudent = require('./routers/student')
const routerTutor = require('./routers/tutor')
const app           = express()

const port          = 7200

app.set('view engine', 'ejs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(express.static(__dirname + '/assets'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/tutors', routerTutor)
app.use('/', routerHome)
app.use('/students', routerStudent)

app.listen(port, () => {
    console.log('Listening on port ', port)
})