const Chance = require('chance')

const chance = Chance()

module.exports = async (app, options) => {
  const { User } = app.sequelize.models
  const users = []

  for (let i = 0; i < options.numUsers; i += 1) {
    users.push({
      name: chance.first()
    })
  }

  await User.bulkCreate(users)
}
