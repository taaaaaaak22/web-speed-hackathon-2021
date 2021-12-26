const { promises: fs } = require('fs')
const path = require('path')

const Router = require('express-promise-router')
const httpErrors = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const { convertMovie } = require('../../converters/convert_movie')
const { UPLOAD_PATH } = require('../../paths')

// 変換した動画の拡張子
const EXTENSION = 'gif'

const router = Router()

router.post('/movies', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized()
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest()
  }

  const movieId = uuidv4()

  const converted = await convertMovie(req.body, {
    // 動画の拡張子を指定する
    extension: EXTENSION,
    // 動画の縦横サイズを指定する (undefined は元動画に合わせる)
    size: undefined,
  })

  const filePath = path.resolve(UPLOAD_PATH, `./movies/${movieId}.${EXTENSION}`)
  await fs.writeFile(filePath, converted)

  return res.status(200).type('application/json').send({ id: movieId })
})

exports.movieRouter = router
