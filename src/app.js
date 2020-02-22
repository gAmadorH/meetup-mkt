const config = require('config')
const fastify = require('fastify')

const {
  environment,
  jwtSecret,
  logger,
  database
} = config

const app = fastify({ logger })

app.register(require('fastify-chalk'))
app.register(require('fastify-graceful-shutdown'))
app.register(require('fastify-sensible'))
app.register(require('fastify-jwt'), {
  secret: jwtSecret
})

app.register(require('./sequelize'), { database })
app.register(require('./models-loader'))
app.register(require('./routes'), { prefix: '/api' })

app.after((err) => {
  app.log.info('NODE_ENV\t\t[%s]', app.chalk.magenta(environment))

  if (err) {
    app.log.error('CUSTOM PLUGINS\t[%s]', app.chalk.red('ERROR'))
    throw err
  }

  app.gracefulShutdown((signal, done) => {
    app.log.info('SIGNAL\t[%s]', app.chalk.white(signal))
    done()
  })
})

module.exports = app
