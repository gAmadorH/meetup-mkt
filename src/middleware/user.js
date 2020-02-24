function isThereUser(request, _reply, done) {
  const { User } = this.sequelize.models
  const { id } = request.params

  User.findByPk(id, {
    attributes: ['id']
  }).then((user) => {
    if (user) {
      request.user = user
      done()
    } else {
      done(this.httpErrors.notFound('The user does not exist'))
    }
  })
}

function authorization(request, _reply, done) {
  const { user } = request
  const { user: userAuth } = request.auth

  if (userAuth.isAdmin || (userAuth.id === user.id)) {
    done()
  } else {
    done(this.httpErrors.forbidden())
  }
}

module.exports = {
  isThereUser,
  authorization
}
