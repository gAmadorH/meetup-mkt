// login
const login = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        minLength: 10,
        maxLength: 50
      },
      password: {
        type: 'string'
      }
    }
  }
}

module.exports = {
  login
}
