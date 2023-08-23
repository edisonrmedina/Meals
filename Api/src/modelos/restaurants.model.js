const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

module.exports = db.define(
  'restaurants',
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (restaurant) => {
        restaurant.name = restaurant.name.toLowerCase();
        restaurant.address = restaurant.address.toLowerCase();
        restaurant.rating = parseInt(restaurant.rating);
        return restaurant;
      },
    },
  }
);