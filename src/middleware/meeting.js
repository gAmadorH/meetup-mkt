function isThereAMeeting(request, reply, done) {
  const { Meeting } = this.sequelize.models
  const { id } = request.params

  Meeting.findByPk(id, {
    attributes: ['id', 'hostId']
  }).then((meeting) => {
    if (meeting) {
      request.meeting = meeting
      done()
    } else {
      done(this.httpErrors.notFound('The meeting does not exist'))
    }
  })
}

function authorization(request, _reply, done) {
  const { meeting, user } = request

  if (meeting.hostId === user.id) {
    done()
  } else {
    done(this.httpErrors.forbidden())
  }
}

module.exports = {
  isThereAMeeting,
  authorization
}
