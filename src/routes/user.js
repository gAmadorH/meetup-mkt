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

  // delete one
  app.delete('/:id', {
    schema: sch.deleteOne
  }, ctl.deleteOne)

  next()
}
