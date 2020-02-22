const fp = require('fastify-plugin')

function fastifyAuth(fastify, _options, done) {
  fastify.decorate('auth', function auth(request, _reply, next) {
    request.jwtVerify((err, decoded) => {
      if (err) {
        next(this.httpErrors.unauthorized(err.message))
      }

      request.user = decoded.user
      next()
    })
  })

  done()
}

module.exports = fp(fastifyAuth, {
  fastify: '>=0.13.1'
})
