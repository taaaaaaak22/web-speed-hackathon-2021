const users = require('./seeds/users.json')
const sounds = require('./seeds/sounds.json')
const profileImages = require('./seeds/profileImages.json')
const postsImagesRelation = require('./seeds/postsImagesRelation.json')
const posts = require('./seeds/posts.json')
const movies = require('./seeds/movies.json')
const images = require('./seeds/images.json')
const comments = require('./seeds/comments.json')

const { Comment } = require('./models/Comment')
const { Image } = require('./models/Image')
const { Movie } = require('./models/Movie')
const { Post } = require('./models/Post')
const { PostsImagesRelation } = require('./models/PostsImagesRelation')
const { ProfileImage } = require('./models/ProfileImage')
const { Sound } = require('./models/Sound')
const { User } = require('./models/User')

async function insertSeeds() {
  await ProfileImage.bulkCreate(profileImages, { logging: false })
  await Image.bulkCreate(images, { logging: false })
  await Movie.bulkCreate(movies, { logging: false })
  await Sound.bulkCreate(sounds, { logging: false })
  await User.bulkCreate(users, { logging: false })
  await Post.bulkCreate(posts, { logging: false })
  await PostsImagesRelation.bulkCreate(postsImagesRelation, { logging: false })
  await Comment.bulkCreate(comments, { logging: false })
}

exports.insertSeeds = insertSeeds
