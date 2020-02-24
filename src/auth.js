const fp = require('fastify-plugin')

function auth(request, _reply, done) {
  request.jwtVerify((err, decoded) => {
    if (err) {
      done(this.httpErrors.unauthorized(err.message))
    } else {
      request.auth = {
        user: decoded.user
      }
      done()
    }
  })
}

function pg(app, _options, done) {
  app.decorate('auth', auth)

  app.log.info('AUTH\t\t\t[%s]', app.chalk.magenta('ready'))
  done()
}

module.exports = fp(pg, {
  fastify: '>=0.13.1',
  decorators: {
    fastify: ['chalk']
  }
})
