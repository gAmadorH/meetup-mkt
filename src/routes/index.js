const authRoutes = require('./auth')
const meetingRoutes = require('./meeting')
const userRoutes = require('./user')

function routes(app, _opts, done) {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(meetingRoutes, { prefix: '/meetings' })
  app.register(userRoutes, { prefix: '/users' })

  done()
}

module.exports = (app, _options, done) => {
  app.get('/health-check', (_request, reply) => {
    reply.send({ status: 'OK' })
  })

  app.register(routes, { prefix: '/api' })

  done()
}
