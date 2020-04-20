const dotenv = require('dotenv')
const Joi = require('joi')

// load env vars
dotenv.config()

const validationSchema = Joi.object({
  // environment
  NODE_ENV: Joi
    .string()
    .valid(['development', 'production'])
    .required(),

  // hosting
  HOST: Joi
    .alternatives(
      Joi.string().ip(),
      Joi.string().hostname()
    )
    .required(),
  PORT: Joi
    .number()
    .port()
    .required(),

  // jwt secret
  JWT_SECRET: Joi
    .string()
    .token()
    .required(),

  // database config
  DB_NAME: Joi
    .string()
    .required(),
  DB_USER: Joi
    .string()
    .required(),
  DB_PASSWORD: Joi
    .string()
    .required(),
  DB_HOST: Joi
    .alternatives(
      Joi.string().ip(),
      Joi.string().hostname()
    )
    .required(),
  DB_PORT: Joi
    .number()
    .port()
    .required()
})

const validationOptions = {
  abortEarly: false,
  stripUnknown: true
}

const { error, value } = Joi.validate(process.env, validationSchema, validationOptions)

if (error) {
  // eslint-disable-next-line no-console
  console.error('Config validation error:')
  throw error
}

// generate a database url
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = value

const dbUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

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
    options: {
      logging: null
    }
  },

  // logger
  logger: {
    redact: ['req.headers.authorization']
  }
}
