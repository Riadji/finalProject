const routes            = require('express').Router()
const controllerStudent = require('../controllers/controllerStudent')

routes.get('/', (req,res,next) => {

    if(req.session.user){
        res.redirect('/')
    } else {
        next()
    }

},controllerStudent.showLogin)
routes.post('/login', controllerStudent.login)
routes.get('/signup', controllerStudent.showSignUp)
routes.post('/signup', controllerStudent.register)

module.exports = routes