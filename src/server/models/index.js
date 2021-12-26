const { Comment } = require('./Comment')
const { Image } = require('./Image')
const { Movie } = require('./Movie')
const { Post } = require('./Post')
const { PostsImagesRelation } = require('./PostsImagesRelation')
const { ProfileImage } = require('./ProfileImage')
const { Sound } = require('./Sound')
const { User } = require('./User')

User.hasMany(Post, {
  as: 'posts',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
})
Post.belongsTo(User, {
  as: 'user',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
})

User.belongsTo(ProfileImage, {
  as: 'profileImage',
  foreignKey: {
    allowNull: false,
    defaultValue: '396fe4ce-aa36-4d96-b54e-6db40bae2eed',
  },
})

Post.belongsToMany(Image, {
  as: 'images',
  foreignKey: {
    name: 'postId',
  },
  otherKey: {
    name: 'imageId',
  },
  through: PostsImagesRelation,
})

Post.belongsTo(Movie, {
  as: 'movie',
})

Post.belongsTo(Sound, {
  as: 'sound',
})

Post.hasMany(Comment, {
  as: 'comments',
  foreignKey: {
    allowNull: false,
    name: 'postId',
  },
})
Comment.belongsTo(Post, {
  as: 'post',
  foreignKey: {
    allowNull: false,
    name: 'postId',
  },
})

Comment.belongsTo(User, {
  as: 'user',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
})

exports.User = User
exports.Post = Post
exports.Image = Image
exports.Movie = Movie
exports.Sound = Sound
exports.Comment = Comment
exports.ProfileImage = ProfileImage
exports.PostsImagesRelation = PostsImagesRelation
