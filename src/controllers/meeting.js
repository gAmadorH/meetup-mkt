// add one
function addOne(request, reply) {
  const { User, Meeting, Location } = this.sequelize.models
  const { user } = request.auth
  const {
    name,
    description,
    date,
    location: {
      country,
      state,
      city,
      street,
      number,
      reference
    }
  } = request.body

  Meeting.create({
    name,
    description,
    date,
    hostId: user.id,
    location: {
      country,
      state,
      city,
      street,
      number,
      reference
    }
  }, {
    include: {
      model: Location,
      as: 'location'
    }
  }).then((meeting) => Meeting.findByPk(meeting.id, {
    attributes: { exclude: ['hostId', 'deletedAt'] },
    include: [{
      model: User,
      as: 'host',
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] }
    }, {
      model: Location,
      as: 'location',
      attributes: { exclude: ['id', 'meetingId'] }
    }]
  }))
    .then((meeting) => {
      reply.send({ meeting })
    })
}

// get all
function getAll(request, reply) {
  const { User, Meeting, Location } = this.sequelize.models
  const {
    limit,
    step,
    orderBy,
    order
  } = request.query

  const [alias, subOrderBy] = orderBy.split('.')
  const orderQuery = []
  const aliasToModel = {
    location: Location,
    host: User
  }

  if (subOrderBy) {
    orderQuery.push([{ model: aliasToModel[alias], as: alias }, subOrderBy, order])
  } else {
    orderQuery.push([orderBy, order])
  }

  Meeting.findAndCountAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    include: [{
      model: User,
      as: 'host',
      attributes: { exclude: ['password', 'isAdmin', 'createdAt', 'updatedAt', 'deletedAt'] }
    }, {
      model: Location,
      as: 'location',
      attributes: { exclude: ['id', 'meetingId'] }
    }],
    distinct: true,
    limit,
    offset: (step - 1) * limit,
    order: orderQuery
  }).then(({ rows: meetings, count: total }) => {
    const steps = Math.ceil(total / limit)

    reply.send({ total, steps, meetings })
  })
}

// get one
function getOne(request, reply) {
  const { User, Meeting } = this.sequelize.models
  const { id } = request.params

  Meeting.findByPk(id, {
    attributes: { exclude: ['hostId', 'deletedAt'] },
    include: [{
      model: User,
      as: 'participants',
      attributes: { exclude: ['password', 'deletedAt'] },
      through: { attributes: [] }
    }, {
      model: User,
      as: 'host',
      attributes: { exclude: ['password', 'deletedAt'] }
    }]
  }).then((meeting) => {
    reply.send({ meeting })
  })
}

// update one
function updateOne(request, reply) {
  const { Meeting } = this.sequelize.models
  const { id } = request.params
  const {
    name,
    description,
    address,
    date
  } = request.body

  Meeting.update({
    name,
    description,
    address,
    date
  }, {
    where: { id }
  })
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
