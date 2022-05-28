import path from 'node:path'
import chalk from 'chalk'
import dotenv from 'dotenv'
import env from 'dotenv-cast'
import __dirname from './utils/dirname.js'
import fse from 'fs-extra'

const envFilePathFull = path.join(__dirname, '../../.env')

// Get and check env variables
fse.pathExists(envFilePathFull)
  .then(exists => console.log(exists ? chalk.blue('".env" file found') : chalk.red('WARNING: ".env" file not found, use ".env-example" as a starting point')))
  .catch(e => console.error(chalk.red('Error checking if ".env" file exists'), e))

dotenv.config()

const db = {
  protocol: env('DB_PROTOCOL', 'mongodb'),
  port: env.int('DB_PORT', 27017),
  host: env('DB_HOST', 'localhost'),
  user: env('DB_USER'),
  password: env('DB_PASSWORD'),
  database: env('DB_NAME', 'recipebytes-db')
}

const dbAuth = db.user && db.password ? `${db.user}:${db.password}@` : ''
const url = `${db.protocol}://${dbAuth}${db.host}:${db.port}/${db.database}`

const config = {
  env: env('NODE_ENV', 'development'),

  server: {
    host: 'localhost',
    port: env.int('PORT', 3030),
    public: path.join(__dirname, '../../public'),
    trustProxy: true,
    logger: true
  },

  cors: {
    origin: env.array('CORS_ORIGIN', `http://localhost:${env.int('PORT', 3030)}`)
  },

  // AUTHENTICATION
  auth: {
    secret: env('JWT_SECRET', 'WoUlD^t=yOuL1K3_2kn0w#'),
    options: {
      algorithm: 'HS256',
      expiresIn: '1d'
    }
  },

  // DATABASE
  dbOptions: {
    connection: {
      url,
      protocol: db.protocol,
      port: db.port,
      host: db.host,
      user: db.user,
      password: db.password,
      database: db.database
    }
  },

  // BUILD LIST
  buildFilesList: env.array('BUILD_LIST', [
    'public',
    'server',
    '.env.example',
    '.nvmrc',
    'ecosystem.config.cjs',
    'migrate-mongo-config.js',
    'package.json',
    'package-lock.json',
    'README.md'
  ])
}

export default config
