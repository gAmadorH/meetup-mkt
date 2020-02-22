const Chance = require('chance')

const chance = Chance()

module.exports = async (app, options) => {
  const { User } = app.sequelize.models
  const users = []

  for (let i = 0; i < options.numUsers; i += 1) {
    users.push({
      firstName: chance.first(),
      lastName: chance.last(),
      username: chance.twitter().substring(1),
      email: chance.email({ domain: 'meetup.com' }),
      password: 'test'
    })
  }

  await User.bulkCreate(users)
}
