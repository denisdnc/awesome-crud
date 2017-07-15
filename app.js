const express = require('express')
const app = express()

const winston = require('winston')
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      'timestamp': true
    })
  ]
})
logger.level = process.env.LOG_LEVEL || 'info'

const config = require('scr/main/config/app-setup')

config.init({
  app: app,
  logger: logger
})

app.listen(process.env.PORT || 3000, () => {
  logger.log('info', 'Application started and listening on port:',
    process.env.PORT || '3000')
})

module.exports = app
