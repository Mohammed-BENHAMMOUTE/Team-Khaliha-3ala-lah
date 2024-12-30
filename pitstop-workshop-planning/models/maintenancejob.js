'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaintenanceJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MaintenanceJob.belongsTo(models.Vehicle, {
        foreignKey: "vehicle",
        onDelete: 'CASCADE'
      })
    }
  };
  MaintenanceJob.init({
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    vehicle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MaintenanceJob',
  });
  return MaintenanceJob;
};