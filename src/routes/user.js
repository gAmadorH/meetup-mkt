const ctl = require('../controllers/user')
const sch = require('../schemes/user')
const middle = require('../middleware/user')

module.exports = (app, _options, next) => {
  // add one
  app.post('/', {
    schema: sch.addOne
  }, ctl.addOne)

  // get all
  app.get('/', {
    preValidation: app.auth,
    schema: sch.getAll
  }, ctl.getAll)

  // get one
  app.get('/:id', {
    preValidation: app.auth,
    schema: sch.getOne,
    preHandler: [
      middle.isThereUser
    ]
  }, ctl.getOne)

  // update one
  app.put('/:id', {
    preValidation: app.auth,
    schema: sch.updateOne,
    preHandler: [
      middle.isThereUser,
      middle.authorization
    ]
  }, ctl.updateOne)

  // enroll one in an event
  app.put('/:id/meeting', {
    preValidation: app.auth,
    schema: sch.enrollOne,
    preHandler: [
      middle.isThereUser,
      middle.authorization
    ]
  }, ctl.enrollOne)

  // unenroll one in an event
  app.delete('/:id/meeting', {
    preValidation: app.auth,
    schema: sch.unenrollOne,
    preHandler: [
      middle.isThereUser,
      middle.authorization
    ]
  }, ctl.unenrollOne)

  // delete one
  app.delete('/:id', {
    preValidation: app.auth,
    schema: sch.deleteOne,
    preHandler: [
      middle.isThereUser,
      middle.authorization
    ]
  }, ctl.deleteOne)

  next()
}
