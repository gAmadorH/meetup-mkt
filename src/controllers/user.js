// add one
function addOne(request, reply) {
  const { User } = this.sequelize.models
  const {
    firstName,
    lastName,
    username,
    email,
    password
  } = request.body

  User.create({
    firstName,
    lastName,
    username,
    email,
    password
  }).then((user) => {
    reply.send({ user })
  })
}

// get all
function getAll(request, reply) {
  const { User } = this.sequelize.models
  const {
    limit,
    step,
    orderBy,
    order
  } = request.query

  User.findAndCountAll({
    attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
    limit,
    offset: (step - 1) * limit,
    order: [[orderBy, order]]
  }).then(({ rows: users, count: total }) => {
    const steps = Math.ceil(total / limit)

    reply.send({ total, steps, users })
  })
}

// get one
function getOne(request, reply) {
  const { User, Meeting } = this.sequelize.models
  const { id } = request.params

  User.findByPk(id, {
    include: {
      model: Meeting,
      through: { attributes: [] }
    }
  }).then((user) => {
    reply.send({ user })
  })
}

// update one
function updateOne(request, reply) {
  const { User } = this.sequelize.models
  const { id } = request.params
  const {
    firstName,
    lastName,
    username,
    email,
    password
  } = request.body

  User.update({
    firstName,
    lastName,
    username,
    email,
    password
  }, { where: { id } })
    .then(() => User.findByPk(id))
    .then((user) => {
      reply.send({ user })
    })
}

// enroll one in an event
function enrollOne(request, reply) {
  const { User, Meeting } = this.sequelize.models
  const { id } = request.params
  const { meetingIds } = request.body

  User.findByPk(id)
    .then((user) => user.addMeetings(meetingIds))
    .then(() => User.findByPk(id, {
      include: {
        model: Meeting,
        through: { attributes: [] }
      }
    }))
    .then((user) => {
      reply.send({ user })
    })
}

// unenroll one in an event
function unenrollOne(request, reply) {
  const { User, Meeting } = this.sequelize.models
  const { id } = request.params
  const { meetingIds } = request.body

  User.findByPk(id)
    .then((user) => user.removeMeetings(meetingIds))
    .then(() => User.findByPk(id, {
      include: {
        model: Meeting,
        through: { attributes: [] }
      }
    }))
    .then((user) => {
      reply.send({ user })
    })
}

// delete one
function deleteOne(request, reply) {
  const { User } = this.sequelize.models
  const { id } = request.params

  User.destroy({ where: { id } }).then(() => {
    reply.send({ })
  })
}

module.exports = {
  addOne,
  getAll,
  getOne,
  updateOne,
  enrollOne,
  unenrollOne,
  deleteOne
}
