const Router = require('express-promise-router')

const { insertSeeds } = require('../../seeds')
const { sequelize } = require('../../sequelize')

const router = Router()

router.post('/initialize', async (_req, res) => {
  await sequelize.sync({
    force: true,
    logging: false,
  })
  await insertSeeds()

  return res.status(200).type('application/json').send({})
})

exports.initializeRouter = router
