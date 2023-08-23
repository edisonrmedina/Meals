const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const bcrypt = require('bcrypt');
module.exports = db.define(
  'users',
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
      allowNull: false,
    },
  },
  {
    tableName: 'users', // Nombre de la tabla en la base de datos
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    hooks: {
      beforeCreate: async (user) => {
        user.name = user.name.toLowerCase();
        user.email = user.email.toLowerCase();
        user.password = await bcrypt.hash(user.password, 10);

        return user;
      },
    },
  }
);