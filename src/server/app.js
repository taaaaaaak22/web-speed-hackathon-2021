const bodyParser = require('body-parser')
const Express = require('express')
const session = require('express-session')

const { apiRouter } = require('./routes/api')
const { staticRouter } = require('./routes/static')

const expressApp = Express()

expressApp.set('trust proxy', true)

expressApp.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  })
)
expressApp.use(bodyParser.json())
expressApp.use(bodyParser.raw({ limit: '10mb' }))

expressApp.use((_req, res, next) => {
  res.header({
    'Cache-Control': 'max-age=0, no-transform',
    Connection: 'close',
  })
  return next()
})

expressApp.use('/api/v1', apiRouter)
expressApp.use(staticRouter)

exports.expressApp = expressApp
