const bodyParser = require('body-parser')
const Express = require('express')
const compression = require('compression')
const session = require('express-session')

const { apiRouter } = require('./routes/api')
const { staticRouter } = require('./routes/static')

const expressApp = Express()

expressApp.set('trust proxy', true)
expressApp.use(compression())

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

expressApp.use('/api/v1', apiRouter)
expressApp.use(staticRouter)

exports.expressApp = expressApp
