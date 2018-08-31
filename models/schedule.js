'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    date: DataTypes.STRING
  }, {});
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belongsToMany(models.Tutor, { through: "TutorSchedule", foreignKey : "ScheduleId" })
  };
  return Schedule;
};