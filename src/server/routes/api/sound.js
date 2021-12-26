const { promises: fs } = require('fs')
const path = require('path')

const Router = require('express-promise-router')
const httpErrors = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const { convertSound } = require('../../converters/convert_sound')
const { UPLOAD_PATH } = require('../../paths')
const {
  extractMetadataFromSound,
} = require('../../utils/extract_metadata_from_sound')

// 変換した音声の拡張子
const EXTENSION = 'mp3'

const router = Router()

router.post('/sounds', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized()
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest()
  }

  const soundId = uuidv4()

  const { artist, title } = await extractMetadataFromSound(req.body)

  const converted = await convertSound(req.body, {
    // 音声の拡張子を指定する
    extension: EXTENSION,
  })

  const filePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`)
  await fs.writeFile(filePath, converted)

  return res
    .status(200)
    .type('application/json')
    .send({ artist, id: soundId, title })
})

exports.soundRouter = router
