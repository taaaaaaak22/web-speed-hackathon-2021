const iconv = require('iconv-lite')
const jschardet = require('jschardet')
const MusicMetadata = require('music-metadata')
const Util = require('music-metadata/lib/common/Util.js')

/**
 * @param {Buffer} buffer
 * @returns {string}
 */
Util.decodeString = function decodeString(buffer) {
  const detected = jschardet.detect(buffer)
  const encoding = detected.encoding || 'windows-1252'

  if (!iconv.encodingExists(encoding)) {
    throw new Error('Cannot detect charset.')
  }

  const decoded = iconv.decode(buffer, encoding)
  return decoded
}

/**
 *
 * @typedef {object} SoundMetadata
 * @property {string} [artist]
 * @property {string} [title]
 */

/**
 * @param {Buffer} data
 * @returns {Promise<SoundMetadata>}
 */
async function extractMetadataFromSound(data) {
  try {
    const metadata = await MusicMetadata.parseBuffer(data)
    return {
      artist: metadata.common.artist,
      title: metadata.common.title,
    }
  } catch (_err) {
    return {
      artist: undefined,
      title: undefined,
    }
  }
}

exports.extractMetadataFromSound = extractMetadataFromSound
