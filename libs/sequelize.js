const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, { // conexion
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);
// sequelize.sync(); // una vez sincronizados va a crear la tabla
// sirve también para la migración de las tablas
// lee los modelos y crea las tablas (usar en desarrollo)

module.exports = sequelize;

