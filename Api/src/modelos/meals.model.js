const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

module.exports = db.define(
  'meals',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'id',
      },
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    hooks: {
      beforeCreate: (meal) => {
        meal.name = meal.name.toLowerCase();
        meal.price = parseInt(meal.price);
        meal.restaurantId = parseInt(meal.restaurantId);
        return meal;
      },
    },
  }
);