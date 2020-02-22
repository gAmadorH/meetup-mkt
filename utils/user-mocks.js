const inquirer = require('inquirer')
const app = require('../src/app')
const mocksUsers = require('../mocks/users')

const questions = [{
  type: 'number',
  name: 'numUsers',
  message: 'How many users would you like to generate?',
  default: 50
}]

inquirer.prompt(questions).then(async (answers) => {
  const { numUsers } = answers

  await app.ready()
  await mocksUsers(app, { numUsers })

  app.close().then((err) => {
    if (err) {
      app.log.error('Error at application shutdown: ')
      app.log.error(err)
      process.exit(1)
    }

    app.log.info('MOCKS\t[%s]', app.chalk.green('SUCCESS'))
    process.exit(0)
  })
})
