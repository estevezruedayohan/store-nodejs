const { config } = require('../config/config.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    // url: URI,
    username: `${USER}`,
    password: `${PASSWORD}`,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'postgres',
  },
  // production: {
  //   url: URI,
  //   dialect: 'postgres',
  // },
}
