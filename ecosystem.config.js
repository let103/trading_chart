module.exports = {
  apps : [{
    name: 'Trading_chart',
    script: 'src/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : '52.221.217.53',
      ref  : 'origin/master',
      repo : 'git@github.com:Fanyusong/trading-chart.git',
      path : '/var/www/trading_chart/',
      key: '/Users/thanhhuynh/Desktop/trading_chart_key.pem',
      ssh_options: ['ForwardAgent=yes'],
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
