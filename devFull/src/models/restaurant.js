const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Restaurant extends Model {}

Restaurant.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Restaurant',
  tableName: 'restaurants',
  timestamps: true,
});

module.exports = Restaurant;