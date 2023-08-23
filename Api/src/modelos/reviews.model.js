const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

module.exports = db.define(
  'reviews',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commnent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (review) => {
        review.commnent = review.commnent.toLowerCase();
        review.restaurantId = parseInt(review.restaurantId);
        review.userId = parseInt(review.userId);

        return review;
      },
    },
  }
);