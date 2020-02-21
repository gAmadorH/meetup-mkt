const meetingRoutes = require('./meeting')

module.exports = (app, _options, next) => {
  app.get('/health-check', (_request, reply) => {
    reply.send({ status: 'OK' })
  })

  app.register(meetingRoutes, { prefix: '/meetings' })

  next()
}
