'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.Customer, {
        foreignKey: "owner",
        onDelete: 'CASCADE'
      })
      Vehicle.hasMany(models.MaintenanceJob, {
        foreignKey: "vehicle"
      })
    }
  };
  Vehicle.init({
    license: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    owner: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};