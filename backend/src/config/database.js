const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: env.DB_PATH,
  logging: false
});

module.exports = sequelize;
