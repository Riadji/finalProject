'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    cityName: DataTypes.STRING
  }, {});
  City.associate = function(models) {
    // associations can be defined here
    City.hasMany(models.Tutor, { foreignKey : "CityId" })
  };
  return City;
};