const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize(URI, { // conexion
  dialect: 'mysql',
  logging: true,
});

setupModels(sequelize);
sequelize.sync(); // una vez sincronizados va a crear la tabla

module.exports = sequelize;

