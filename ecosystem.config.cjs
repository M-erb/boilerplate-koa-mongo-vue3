module.exports = {
  apps: [{
    name: 'boilerplate',
    script: './server/server.js',
    error_file: './.logs/err.log',
    out_file: './.logs/out.log',
    log_file: './.logs/combined.log',
    time: true,
    instances: 1,
    autorestart: true,
    watch: true,
    restart_delay: 1000,
    ignore_watch: [
      'public',
      'client',
      '.cache',
      '.data',
      'node_modules',
      '.logs',
      '^[.]'
    ],
    max_memory_restart: '2G'
  }]
}
