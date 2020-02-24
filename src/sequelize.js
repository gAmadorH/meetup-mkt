const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

function onClose(app, done) {
  app.sequelize.close().then(() => {
    app.log.info('DATABASE\t[%s]', app.chalk.white('disconnected'))
    done()
  }).catch((err) => {
    app.log.error('DATABASE\t[%s]', app.chalk.red('no disconnected'))
    done(err)
  })
}

function pg(app, options, done) {
  const { url, params } = options.database
  let sequelize = null

  try {
    sequelize = new Sequelize(url, params)
  } catch (err) {
    app.log.error('DATABASE\t\t[%s]', app.chalk.red('error'))
    done(err)
  }

  app.decorate('sequelize', sequelize)
  app.decorate('Sequelize', Sequelize)

  // if the app is closed, the db will also be closed
  app.addHook('onClose', onClose)

  app.log.info('DATABASE\t\t[%s]', app.chalk.magenta('ready'))
  done()
}

module.exports = fp(pg, {
  fastify: '>=0.13.1',
  decorators: {
    fastify: ['chalk']
  }
})
