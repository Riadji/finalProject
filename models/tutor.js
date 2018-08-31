'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tutor = sequelize.define('Tutor', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    CityId: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER
  }, {});
  Tutor.associate = function(models) {
    // associations can be defined here

    Tutor.belongsTo(models.City, {foreignKey : "CityId"})
    Tutor.belongsTo(models.Subject, {foreignKey : "SubjectId"})
    Tutor.belongsToMany(models.Schedule, { through: "TutorSchedule", foreignKey : "TutorId" })
    Tutor.hasMany(models.Invoice, {foreignKey : "TutorId"})
  };
  return Tutor;
};