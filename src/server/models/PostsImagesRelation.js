const { DataTypes } = require('sequelize')

const { sequelize } = require('../sequelize')

const { Image } = require('./Image')
const { Post } = require('./Post')

const PostsImagesRelation = sequelize.define('PostsImagesRelation', {
  imageId: {
    references: {
      model: Image,
    },
    type: DataTypes.STRING,
  },
  postId: {
    references: {
      model: Post,
    },
    type: DataTypes.STRING,
  },
})

exports.PostsImagesRelation = PostsImagesRelation
