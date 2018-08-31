const { Tutor } = require('../models')
const { Schedule } = require('../models')
const { Subject } = require('../models')
const { City } = require('../models')
const { Invoice } = require('../models')
const { Student } = require('../models')
const { TutorSchedule } = require('../models')
const dateConverter = require('../helpers/dateConverter')

class controllerTutor {

    static show(req,res){
        Tutor.findById(1,{
            include: [{
                model: City
            }, {
                model: Subject
            }, {
                model : Invoice
            }]
        })
        .then( tutor => {

            let tempInvoiceAlert = []

            for(let i = 0; i < tutor.Invoices.length; i++){
                if(tutor.Invoices[i].alert == false){
                    tempInvoiceAlert.push(tutor.Invoices[i].alert)
                }
            }
            res.render('tutor/home', { tutor , tempInvoiceAlert})
        })
    }

    static schedule(req,res){
        let tempTutor = null
        Tutor.findById(1,{
            include: [{
                model: Schedule
            }, {
                model : Invoice
            }]
        })
        .then( tutor => {

            tempTutor = tutor
            return Student.findAll({
                order : [['id', 'ASC']]
            })
        })
        .then( students => {

            let tempInvoiceAlert = []

            for(let i = 0; i < tempTutor.Invoices.length; i++){
                if(tempTutor.Invoices[i].alert == false){
                    tempInvoiceAlert.push(tempTutor.Invoices[i].alert)
                }
            }

            res.render('tutor/schedule', { tutor : tempTutor,students, tempInvoiceAlert})
        })
        .catch( err => {
            res.send(err)
        })
    }

    static ordered(req,res){
        let invoices = null
        Tutor.findById(1,{
            include: [{
                model: Invoice
            }]
        })
        .then( invoice => {

            invoices = invoice
            return Student.findAll()
        })
        .then( students => {

            let tempInvoiceAlert = []

            for(let i = 0; i < invoices.Invoices.length; i++){
                if(invoices.Invoices[i].alert == false){
                    tempInvoiceAlert.push(invoices.Invoices[i].alert)
                }
            }

            res.render('tutor/ordered', { tutor : invoices, students, tempInvoiceAlert, dateConverter})
        })
        .catch( err => {
            res.send(err)
        })
    }

    static orderComplete(req,res){

        Invoice.update(
            { alert : true },
            {where : { id : req.params.id }}
        )
        .then( () => {
            res.redirect('/tutors/ordered')
        })
        .catch( err => {
            res.send(err)
        })
    }

    static addData(req, res) {
      City.findAll()
      .then( cities => {
        res.render('tutor/tutorRegister/tutorRegister', {cities})
      })
      .catch( err => {
        res.send(err)
      })
    }

    static createData(req, res) {
      Tutor.create({
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password
      })
      .then( tutors => {
        // res.send(tutors)
        res.redirect('tutors/login')
      })
      .catch( err => {
        res.send(err)
      })
    }

    static logIn(req, res) {
      res.render('tutor/tutorLogin/tutorLogin')
    }

    static checkLogin(req, res) {
      let emailInput = req.body.email
      let passwordInput = req.body.password
      Tutor.findOne({
        where:{
          email:emailInput,
          password:passwordInput
        }
      })
      .then( tutor => {
        if (tutor.email === emailInput && tutor.password === passwordInput) {
          res.redirect(`${tutor.id}`)
        }
        else {
          let warn = true
          // res.redirect('login')
        }
      })
    }

    static edit(req, res) {
      Tutor.findById(req.params.id)
      .then( data => {
        return Subject.findAll()
      })
    }

    static dashboard(req, res) {
      let tutor = '';
      let cities = '';
      Tutor.findAll()
      .then( tut => {
        res.render(tut)
        tutor = tut
        return City.findAll()
      })
      .then(cit => {
        cities = cit
        return Subject.findAll()
      })
      .then(subjects => {
        // res.send(req.params.id)
        res.render('tutor/tutorDashboard/tutorDashboard', {tutor, cities, subjects})
      })
    }

    static addSchedule(req, res) {
      // res.send(req.params.id)
      Schedule.findAll()
      .then( schedules => {
        res.render('tutor/addSchedule/addSchedule', {schedules})
      })
    }

}

module.exports = controllerTutor
