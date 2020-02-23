module.exports = {
  // database config
  database: {
    params: {
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
