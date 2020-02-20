const inquirer = require('inquirer')
const app = require('../src/app')

app.ready().then(() => {
  const questions = [{
    type: 'confirm',
    name: 'syncForceConfirm',
    message: '== WARNING: FORCEFUL SYNC WILL DELETE ALL DATA, Are you sure? ==',
    default: false
  }]

  inquirer.prompt(questions).then((answers) => {
    app.sequelize.sync({ force: answers.syncForceFlag }).then(() => {
      app.close().then((err) => {
        if (err) {
          app.log.error('Error at application shutdown: ')
          app.log.error(err)
          process.exit(1)
        }

        app.log.info('SYNC\t[%s]', app.chalk.green('SUCCESS'))
        process.exit(0)
      })
    })
  })
}, (err) => {
  app.log.error('Error at application shutdown: ')
  app.log.error(err)
  process.exit(1)
})
