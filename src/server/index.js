const http = require('http')
const next = require('next')
const fs = require('fs')
const path = require('path')
const { expressApp } = require('./app')
const { insertSeeds } = require('./seeds')
const { sequelize } = require('./sequelize')
const { UPLOAD_PATH } = require('./paths')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(async () => {
    // データベースの初期化
    await sequelize.sync({
      force: true,
      logging: false,
    })
    await insertSeeds()

    if (!fs.existsSync(UPLOAD_PATH)) {
      fs.mkdirSync(UPLOAD_PATH)
    }

    const imgDir = path.resolve(UPLOAD_PATH, './images/')
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir)
    }

    const movieDir = path.resolve(UPLOAD_PATH, './movies/')
    if (!fs.existsSync(movieDir)) {
      fs.mkdirSync(movieDir)
    }

    const soundDir = path.resolve(UPLOAD_PATH, './sounds/')
    if (!fs.existsSync(soundDir)) {
      fs.mkdirSync(soundDir)
    }

    expressApp.all('*', (req, res) => {
      return handle(req, res)
    })
    const server = http.createServer(expressApp)

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(console.error)
