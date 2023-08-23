const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
module.exports = db.define(
    'orders',
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mealId : {
            type: DataTypes.INTEGER,
            allowNull: false,  
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
            model: 'users',
            key: 'id',
            }
        },
        status: {
            type: DataTypes.ENUM('active', 'cancelled','completed'),
            defaultValue: 'active',
            allowNull: false
        }
    } ,
    {
        hooks: {
            beforeCreate: (meal) => {
                meal.name = meal.name.toLowerCase();
                meal.price = parseInt(meal.price);
                meal.mealId = parseInt(meal.mealId);
                meal.userId = parseInt(meal.userId);
                return meal;
            },
        },
    }
);