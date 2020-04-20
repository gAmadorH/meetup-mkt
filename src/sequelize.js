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

async function pg(app, opts) {
  const { url, options } = opts.database
  let sequelize = null

  if (options.logging) {
    options.logging = (msg) => app.log.debug(msg)
  }

  try {
    sequelize = new Sequelize(url, options)

    await sequelize.authenticate()
  } catch (err) {
    app.log.error('DATABASE\t\t[%s]', app.chalk.red('error'))
    throw err
  }

  app.decorate('sequelize', sequelize)
  app.decorate('Sequelize', Sequelize)

  // if the app is closed, the db will also be closed
  app.addHook('onClose', onClose)

  app.log.info('DATABASE\t\t[%s]', app.chalk.magenta('ready'))
}

module.exports = fp(pg, {
  fastify: '>=0.13.1',
  decorators: {
    fastify: ['chalk']
  }
})
