const fs = require('fs')
const fp = require('fastify-plugin')
const path = require('path')

function pg(app, _opts, done) {
  const db = {}

  try {
    const pathModels = path.join(__dirname, 'models')

    fs.readdirSync(pathModels).forEach((file) => {
      const pathFile = path.join(pathModels, file)
      const model = app.sequelize.import(pathFile)

      db[model.name] = model

      app.log.debug('%s\t\t%s', 'import', model.name)
    })
  } catch (err) {
    app.log.error('MODELS\t\t[%s]', app.chalk.red('error'))
    done(err)
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  app.log.info('MODELS\t\t[%s]', app.chalk.magenta('loaded'))
  done()
}

module.exports = fp(pg, {
  fastify: '>=0.13.1',
  decorators: {
    fastify: ['chalk', 'sequelize']
  }
})
