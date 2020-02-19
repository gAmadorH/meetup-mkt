const dotenv = require('dotenv')
const Joi = require('joi')

// load env vars
dotenv.config()

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  HOST: Joi.string().ip().required(),
  PORT: Joi.number().port().required(),
  JWT_SECRET: Joi.string().token().required(),
  DATABASE_URL: Joi.string().uri().required()
})

const validationOptions = {
  abortEarly: false,
  stripUnknown: true
}

const { error, value } = Joi.validate(process.env, validationSchema, validationOptions)

if (error) {
  console.error('Config validation error:')
  throw error
}

module.exports = {
  // environment
  environment: value.NODE_ENV,

  // hosting
  host: value.HOST,
  port: value.PORT,

  // jwt secret
  jwtSecret: value.JWT_SECRET,

  // database url
  databaseUrl: value.DATABASE_URL,

  // logger
  logger: {
    redact: ['req.headers.authorization']
  }
}
