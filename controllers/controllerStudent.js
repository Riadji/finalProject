const { Student }   = require('../models')
const { Tutor }     = require('../models')
const { Schedule }  = require('../models')
const { Subject }   = require('../models')

const checkPassword = require('../helpers/checkPasswordLogin')

class controllerStudent {
    
    static showLogin(req,res){
        res.render('student/login')
    }

    static login(req,res){
        
        let passwordUser = checkPassword(req.body.password, req.body.email)
       
        Student.findOne(
            { where : { email : req.body.email, password : passwordUser }}
        )
        .then( (data) => {
            if(data){
                req.session.user=data
                res.redirect('/')
            } else {
                res.redirect('/students')
                // let msg = `Email or passord wrong`
                // controllerStudent.showLogin(req,res, msg)
            }
        })
        .catch( err => {})
    }

    static showSignUp(req,res, tempError){
        res.render('student/signup', {tempError})
    }

    static register(req,res){
        Student.create(req.body)
        .then(()=> {
            res.redirect('/students')
        })
        .catch( err => {
            let tempError = []

            for(let i = 0; i < err.errors.length; i++){
                tempError.push(err.errors[i].message)
            }

            controllerStudent.showSignUp(req,res, tempError)
        })
    }

}

module.exports = controllerStudent