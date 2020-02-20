module.exports = {
  // database config
  database: {
    options: {
      logging: true
    }
  },

  // logger
  logger: {
    level: 'debug',
    prettyPrint: {
      colorize: true,
      translateTime: 'SYS:HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
}
