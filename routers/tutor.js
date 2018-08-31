const routes            = require('express').Router()
const controllerTutor   = require('../controllers/controllerTutor')

routes.get('/', controllerTutor.show)
routes.get('/schedule', controllerTutor.schedule)
routes.get('/ordered', controllerTutor.ordered)
routes.get('/ordered/:id/completed', controllerTutor.orderComplete)

routes.get('/', controllerTutor.addData)
routes.post('/add', controllerTutor.createData)
routes.get('/login', controllerTutor.logIn)
routes.post('/login', controllerTutor.checkLogin)
routes.get('/:id', controllerTutor.dashboard)
routes.get('/:id/addSchedule', controllerTutor.addSchedule)

module.exports = routes
