const Router = require('express-promise-router')
const serveStatic = require('serve-static')

const { UPLOAD_PATH } = require('../paths')

const router = Router()

router.use(
  serveStatic(UPLOAD_PATH, {
    etag: false,
    lastModified: false,
  })
)

exports.staticRouter = router
