'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg : `name is required`
        },
        isAlpha : {
          args : true,
          msg : `name must letter`
        }
    }},
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg : `gender is required`
        }
    }},
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg : `address is required`
        }
    }},
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg : `phone number is required`
        }
    }},
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg : `email number is required`
        },
        is: {
          args: [/[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$/],
          msg: "email format is incorrect"
        }
    }},
    password:{
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg : `password number is required`
        }
    }}
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        const crypto = require('crypto');

        const secret = instance.email;
        const hash = crypto.createHmac('sha256', secret)
                          .update(instance.password)
                          .digest('hex');

        instance.password = hash
       
      },
    }
  });
  Student.associate = function(models) {
    // associations can be defined here
    Student.hasMany(models.Invoice, {foreignKey : "StudentId"})
  };
  return Student;
};