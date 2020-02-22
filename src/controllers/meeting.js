// add one
function addOne(request, reply) {
  const { Meeting } = this.sequelize.models
  const { name } = request.body
  const { user } = request

  Meeting.create({ name, hostId: user.id }).then((meeting) => {
    reply.send({ meeting })
  })
}

// get all
function getAll(request, reply) {
  const { Meeting } = this.sequelize.models
  const {
    limit,
    step,
    orderBy,
    order
  } = request.query

  Meeting.findAndCountAll({
    attributes: { exclude: ['deletedAt'] },
    limit,
    offset: (step - 1) * limit,
    order: [[orderBy, order]]
  }).then(({ rows: meetings, count: total }) => {
    const steps = Math.ceil(total / limit)

    reply.send({ total, steps, meetings })
  })
}

// get one
function getOne(request, reply) {
  const { Meeting } = this.sequelize.models
  const { id } = request.params

  Meeting.findByPk(id, {
    attributes: { exclude: ['deletedAt'] }
  }).then((meeting) => {
    reply.send({ meeting })
  })
}

// update one
function updateOne(request, reply) {
  const { Meeting } = this.sequelize.models
  const { id } = request.params
  const { name } = request.body

  Meeting.update({ name }, { where: { id } })
    .then(() => Meeting.findByPk(id, { attributes: { exclude: ['deletedAt'] } }))
    .then((meeting) => {
      reply.send({ meeting })
    })
}

// delete one
function deleteOne(request, reply) {
  const { Meeting } = this.sequelize.models
  const { id } = request.params

  Meeting.destroy({ where: { id } }).then(() => {
    reply.send({ })
  })
}

module.exports = {
  addOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
}
