const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

console.log(
    process.env.DB_HOST,
    process.env.DB_PORT,
    process.env.DB_USERNAME,
)
const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
});

module.exports = {
  db,
};
