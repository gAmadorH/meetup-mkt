const config = require('config')
const app = require('./app')

const { port, host } = config

app.listen(port, host).then(() => {
  app.log.info('SERVER\t\t[%s]', app.chalk.magenta('READY'))
  app.log.info('HOST\t\t\t[%s]', app.chalk.magenta(port))
  app.log.info('PORT\t\t\t[%s]', app.chalk.magenta(host))

  app.log.debug(app.chalk.white('\n'))
  app.log.debug(app.chalk.white(app.printRoutes()))
})
