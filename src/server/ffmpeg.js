const { createFFmpeg } = require('@ffmpeg/ffmpeg')

const ffmpeg = createFFmpeg({ log: false })

exports.ffmpeg = ffmpeg
