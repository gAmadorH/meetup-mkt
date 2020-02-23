const dotenv = require('dotenv')
const Joi = require('joi')

// load env vars
dotenv.config()

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  HOST: Joi.string().ip().required(),
  PORT: Joi.number().port().required(),
  JWT_SECRET: Joi.string().token().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().ip().required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_DIALECT: Joi.string().required()
})

const validationOptions = {
  abortEarly: false,
  stripUnknown: true
}

const { error, value } = Joi.validate(process.env, validationSchema, validationOptions)

if (error) {
  /* eslint-disable no-console */
  console.error('Config validation error:')
  throw error
}

// generate a database url
const dbUser = value.DATABASE_USER
const dbPassword = value.DATABASE_PASSWORD
const dbHost = value.DATABASE_HOST
const dbPort = value.DATABASE_PORT
const dbName = value.DATABASE_NAME
const dbUrl = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`

module.exports = {
  // environment
  environment: value.NODE_ENV,

  // hosting
  host: value.HOST,
  port: value.PORT,

  // jwt secret
  jwtSecret: value.JWT_SECRET,

  // database config
  database: {
    url: dbUrl,
    params: {
      dialect: value.DATABASE_DIALECT,
      logging: null
    }
  },

  // logger
  logger: {
    redact: ['req.headers.authorization']
  }
}
