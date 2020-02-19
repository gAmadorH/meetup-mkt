module.exports = (app, _options, next) => {
  app.get('/health-check', (_request, reply) => {
    reply.send({ status: 'OK' })
  })

  next()
}
