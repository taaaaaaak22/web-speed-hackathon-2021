const { DataTypes, Sequelize } = require('sequelize')

const { sequelize } = require('../sequelize')

/**
 * @typedef {object} MovieAttributes
 * @property {string} id
 */

/**
 * @typedef {import('sequelize').Model<MovieAttributes>} MovieModel
 */

/** @type {import('sequelize').ModelCtor<MovieModel>} */
const Movie = sequelize.define('Movie', {
  id: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
})

exports.Movie = Movie
