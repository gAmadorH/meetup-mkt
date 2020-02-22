const ctl = require('../controllers/auth')
const sch = require('../schemes/auth')

module.exports = (app, _options, next) => {
  // login
  app.post('/login', {
    schema: sch.login
  }, ctl.login)

  next()
}
