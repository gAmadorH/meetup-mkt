const meetingRoutes = require('./meeting')
const userRoutes = require('./user')

module.exports = (app, _options, next) => {
  app.get('/health-check', (_request, reply) => {
    reply.send({ status: 'OK' })
  })

  app.register(meetingRoutes, { prefix: '/meetings' })
  app.register(userRoutes, { prefix: '/users' })

  next()
}
