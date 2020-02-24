module.exports = {
  apps: [{
    name: 'meetup-DEV',
    script: 'src',
    instances: 1,
    autorestart: true,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production'
    },
    output: './logs/out.log',
    error: './logs/error.log',
    wait_ready: true
  }],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
