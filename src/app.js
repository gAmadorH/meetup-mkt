const config = require('config')
const fastify = require('fastify')

const {
  environment,
  jwtSecret,
  logger,
  database
} = config

const app = fastify({ logger })

// ecosystem plugins
app.register(require('fastify-chalk'))
app.register(require('fastify-graceful-shutdown'))
app.register(require('fastify-jwt'), { secret: jwtSecret })
app.register(require('fastify-sensible'))

app.after((err) => {
  if (err) {
    app.log.error('ECOSYSTEM PLUGINS\t[%s]', app.chalk.red('error'))
    throw err
  }

  app.log.info('ECOSYSTEM PLUGINS\t[%s]', app.chalk.magenta('ready'))
  app.log.info('ENVIRONMENT\t\t[%s]', app.chalk.magenta(environment))
})

// system plugins
app.register(require('./auth'))
app.register(require('./sequelize'), { database })
app.register(require('./models-loader'))
app.register(require('./routes'))

app.after((err) => {
  if (err) {
    app.log.error('SYSTEM PLUGINS\t[%s]', app.chalk.red('error'))
    fastify.log.error(err)
  }

  app.gracefulShutdown((signal, done) => {
    app.log.info('SIGNAL\t\t[%s]', app.chalk.magenta(signal))
    done()
  })

  app.log.info('SYSTEM PLUGINS\t[%s]', app.chalk.magenta('ready'))
})

module.exports = app
