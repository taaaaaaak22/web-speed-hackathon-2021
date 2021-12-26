const Router = require('express-promise-router')
const httpErrors = require('http-errors')
const { ValidationError } = require('sequelize')

const { authRouter } = require('./api/auth')
const { imageRouter } = require('./api/image')
const { initializeRouter } = require('./api/initialize')
const { movieRouter } = require('./api/movie')
const { postRouter } = require('./api/post')
const { soundRouter } = require('./api/sound')
const { userRouter } = require('./api/user')

const router = Router()

router.use(initializeRouter)
router.use(userRouter)
router.use(postRouter)
router.use(movieRouter)
router.use(imageRouter)
router.use(soundRouter)
router.use(authRouter)

router.use(async (err, _req, _res, _next) => {
  if (err instanceof ValidationError) {
    throw new httpErrors.BadRequest()
  }
  throw err
})

router.use(async (err, _req, res, _next) => {
  if (!('status' in err) || err.status === 500) {
    console.error(err)
  }

  return res
    .status(err.status || 500)
    .type('application/json')
    .send({
      message: err.message,
    })
})

exports.apiRouter = router
