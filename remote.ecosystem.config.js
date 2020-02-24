'use strict'

module.exports = {
  apps: [{
    name: 'meetup-DEV',
    script: 'src',
    instances: 1,
    autorestart: true,
    exec_mode: 'fork',
    max_memory_restart: '200M',
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'production'
    },
    output: './logs/out.log',
    error: './logs/error.log',
    wait_ready: true
  }, {
    name: 'meetup-PROD',
    script: 'src',
    instances: 0,
    autorestart: true,
    exec_mode: 'cluster',
    max_memory_restart: '200M',
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'production'
    },
    output: './logs/out.log',
    error: './logs/error.log',
    wait_ready: true
  }]
}
