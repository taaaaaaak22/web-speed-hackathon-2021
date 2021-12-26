const path = require('path')

const UPLOAD_PATH = path.resolve(__dirname, '../../upload')
const DATABASE_PATH = path.resolve(__dirname, '../database.sqlite')

exports.DATABASE_PATH = DATABASE_PATH
exports.UPLOAD_PATH = UPLOAD_PATH
