const { Tutor } = require('../models')
const { Schedule } = require('../models')
const { Subject } = require('../models')
const { City } = require('../models')
const { Invoice } = require('../models')
const { TutorSchedule } = require('../models')
const countingInvoice = require('../helpers/countingInvoice')

class controllerHome {

    static showData(req, res) {

        let tmpTutors = null
        let tmpCities = null
        Tutor.findAll(
            {
                order : [["id", "ASC"]],
                include: [{
                    model: City
                }, {
                    model: Subject
                }]
            },

        )
          .then(tutors => {
            tmpTutors = tutors
            return City.findAll()
          })
          .then( cities => {
            tmpCities = cities
            return Subject.findAll()
          })
          .then( subjects => {
            res.render('home/home', { tutors : tmpTutors, cities : tmpCities,  subjects})
          })
          .catch(err => {
            res.send(err)
          })
    }

    static previewTutor(req,res){
        Tutor.findById(req.params.id,
            {
                include: [{
                    model: City
                }, {
                    model: Subject
                }, {
                    model: Schedule
                }]
            },
        )
          .then(tutor => {
            res.render('home/previewTutor', { tutor })
          })
          .catch(err => {
            res.send(err)
          })
    }

    static showInvoice(req,res){
        Tutor.findById(req.params.idTutor, {
            include: [{
                model: City
            }, {
                model: Subject
            }, {
                model: Schedule
            }]
        })
        .then(tutor => {

            let scheduleTime = Object.values(req.body)[0]

            let price = countingInvoice(req.body)

            req.session.price = price

            let user = req.session.user
            
            if(price !== undefined) {
                res.render('home/invoice', {tutor, price, scheduleTime, user})
            } else {
                res.redirect(`/${req.params.idStudent}/preview-tutors`)
            }
            
        })
        .catch( err => {
            res.send(err)
        })
        
    }

    static filterData(req,res){

        let tmpTutors = null
        let tmpCities = null
        Tutor.findAll(
            {
                order : [["id", "ASC"]],
                include: [{
                    model: City
                }, {
                    model: Subject
                }]
            },

        )
          .then(tutors => {
            tmpTutors = tutors
            return City.findAll()
          })
          .then( cities => {
            tmpCities = cities
            return Subject.findAll()
          })
          .then( subjects => {
            let subjectId   = req.query.SubjectId
            let genderTutor = req.query.gender
            let location    = req.query.CityId

            res.render('home/homeFilter', { tutors : tmpTutors, cities : tmpCities,  subjects, subjectId, genderTutor, location})
          })
          .catch(err => {
            res.send(err)
          })
    }

    static payment(req,res){
       
        let idTime = req.body.scheduleTime
        let arrIdTime = idTime.split(',')
     
        Invoice.create(
            {
                StudentId : req.body.idStudent,
                TutorId : req.body.idTutor,
                price : req.body.price,
                status: false,
                status: true,
            }
        )
        .then( () => {

            for(let i = 0; i < arrIdTime.length; i++){
                let toNumber = Number(arrIdTime[i])
                TutorSchedule.update(
                    { 
                        StudentId :  req.body.idStudent,
                        tutorStatus : false
                    },
                    { where : { TutorId :  req.body.idTutor, ScheduleId : toNumber} }
                )
            }

            res.redirect('/')
        })
        .catch( err => {
            res.send(err)
        })
    }


    // Masih di hendle
    static sementara(req,res){
        res.redirect('/')
    }

}

module.exports = controllerHome