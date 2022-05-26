'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pointsofinterest extends Model {
      
    
    static associate(models) {
      // define association here
    }
  };
  pointsofinterest.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    lon: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
    description: DataTypes.STRING,
    recommendations: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pointsofinterest',
    timestamps: false
  });
  return pointsofinterest;
};