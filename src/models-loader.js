const fs = require('fs')
const fp = require('fastify-plugin')
const path = require('path')

function fastifyModels(fastify, _options, done) {
  const modelsPath = path.join(__dirname, 'models')
  const db = {}

  try {
    fs.readdirSync(modelsPath).forEach((file) => {
      const model = fastify.sequelize.import(path.join(modelsPath, file))
      db[model.name] = model

      fastify.log.debug(' %s\t%s', fastify.chalk.magenta('import'), model.name)
    })
  } catch (err) {
    fastify.log.error('MODELS\t[%s]', fastify.chalk.red('error'))
    done(err)
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) db[modelName].associate(db)
  })

  fastify.log.info('MODELS\t\t[%s]', fastify.chalk.magenta('loaded'))
  done()
}

module.exports = fp(fastifyModels, {
  fastify: '>=0.13.1',
  decorators: {
    fastify: ['chalk']
  }
})
