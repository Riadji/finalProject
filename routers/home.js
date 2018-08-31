const routes         = require('express').Router()
const ControllerHome = require('../controllers/controllerHome')

routes.get('/', (req,res,next)=>{

    if(req.session.user){
        next()
    } else {
        res.redirect('/students')
    }

} ,ControllerHome.showData)

routes.get('/filter', ControllerHome.filterData)

routes.get('/:id/preview-tutors', ControllerHome.previewTutor)

routes.post('/book-tutor/:idTutor/student/', (req,res,next)=>{

    if(req.session.user){
        next()
    } else {
        res.redirect('/students')
    }

}, ControllerHome.showInvoice)

routes.post('/payment', ControllerHome.payment)

routes.get('/book-tutor/:id', ControllerHome.sementara)

module.exports = routes