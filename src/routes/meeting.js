const ctl = require('../controllers/meeting')
const sch = require('../schemes/meeting')
const middle = require('../middleware/meeting')

module.exports = (app, _options, next) => {
  // add one
  app.post('/', {
    preValidation: app.auth,
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
      middle.isThereAMeeting
    ]
  }, ctl.getOne)

  // update one
  app.put('/:id', {
    preValidation: app.auth,
    schema: sch.updateOne,
    preHandler: [
      middle.isThereAMeeting,
      middle.authorization
    ]
  }, ctl.updateOne)

  // delete one
  app.delete('/:id', {
    preValidation: app.auth,
    schema: sch.deleteOne,
    preHandler: [
      middle.isThereAMeeting,
      middle.authorization
    ]
  }, ctl.deleteOne)

  next()
}
