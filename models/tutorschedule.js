'use strict';
module.exports = (sequelize, DataTypes) => {
  const TutorSchedule = sequelize.define('TutorSchedule', {
    TutorId: DataTypes.INTEGER,
    ScheduleId: DataTypes.INTEGER,
    tutorStatus: DataTypes.BOOLEAN,
    StudentId : DataTypes.INTEGER
  }, {});
  TutorSchedule.associate = function(models) {
    // associations can be defined here
  };
  return TutorSchedule;
};