const { Sequelize } = require('sequelize')

const { DATABASE_PATH } = require('./paths')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: DATABASE_PATH,
})

exports.sequelize = sequelize
