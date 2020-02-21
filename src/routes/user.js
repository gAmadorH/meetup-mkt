const ctl = require('../controllers/user')
const sch = require('../schemes/user')

module.exports = (app, _options, next) => {
  // add one
  app.post('/', {
    schema: sch.addOne
  }, ctl.addOne)

  // get all
  app.get('/', {
    schema: sch.getAll
  }, ctl.getAll)

  // get one
  app.get('/:id', {
    schema: sch.getOne
  }, ctl.getOne)

  // update one
  app.put('/:id', {
    schema: sch.updateOne
  }, ctl.updateOne)

  // enroll one in an event
  app.put('/:id/meeting', {
    schema: sch.enrollOne
  }, ctl.enrollOne)

  // unenroll one in an event
  app.delete('/:id/meeting', {
    schema: sch.unenrollOne
  }, ctl.unenrollOne)

  // delete one
  app.delete('/:id', {
    schema: sch.deleteOne
  }, ctl.deleteOne)

  next()
}
