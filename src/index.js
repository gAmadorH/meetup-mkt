const config = require('config')
const app = require('./app')

const { port, host } = config

app.listen(port, host).then((address) => {
  app.log.info('SERVER\t\t[%s]', app.chalk.magenta('ready'))
  app.log.info('ADDRESS\t\t[%s]', app.chalk.magenta(address))

  app.log.debug(app.chalk.white('\n'))
  app.log.debug(app.chalk.white(app.printRoutes()))
}).catch((err) => {
  app.log.error('SERVER\t\t[%s]', app.chalk.red('error'))
  throw err
})
