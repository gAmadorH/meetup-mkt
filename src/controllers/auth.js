// login
function login(request, reply) {
  const { User } = this.sequelize.models
  const { email, password } = request.body
  const { sign } = this.jwt

  User.findOne({
    attributes: ['id', 'password'],
    where: { email }
  }).then((user) => {
    if (!user || !user.validatePassword(password)) {
      return reply.unauthorized()
    }

    const jwtPayload = { user: { id: user.id } }
    const jwtOptions = { expiresIn: '20m' }
    const token = sign(jwtPayload, jwtOptions)

    return reply.send({ token })
  })
}

module.exports = {
  login
}
