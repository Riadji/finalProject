'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    StudentId: DataTypes.INTEGER,
    TutorId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    alert: DataTypes.BOOLEAN
  }, {
    // hooks: {
    //   beforeCreate: (instance, options) => {
    //     console.log(instance)
    //   }
    // }
  });
  Invoice.associate = function(models) {
    // associations can be defined here
    Invoice.belongsTo(models.Student, { foreignKey : 'StudentId' })
    Invoice.belongsTo(models.Tutor, { foreignKey : 'TutorId' })
  };
  return Invoice;
};