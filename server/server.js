import config from './config.js'
import path from 'node:path'
import __dirname from './utils/dirname.js'
import chalk from 'chalk'
import Koa from 'koa'
import jsonError from 'koa-json-error'
import dbConnect from './utils/dbConnect.js'
import koaStatic from 'koa-static'
import helmet from 'koa-helmet'
import nunjucks from 'koa-nunjucks-async'
import templateOptions from './utils/templateOptions.js'
import routers from './routes/router.js'

const veiwsPath = path.join(__dirname, '../views')

async function initServer () {
  let dbError = false
  const initDB = await dbConnect().catch(err => { dbError = err })
  if (dbError) {
    console.error(chalk.bgRed(' -=DB Connection FAILED=- '))
    console.error(dbError)
    return
  } else console.log(chalk.blue(initDB))

  const app = new Koa()

  // settings
  app.env = config.env
  app.proxy = config.server.trustProxy
  app.context.config = config

  // Communuty middleware
  app.use(jsonError(err => {
    const { status, message, details } = err
    return { status, message, details }
  }))
  app.use(helmet())
  app.use(koaStatic(config.server.public))
  app.use(nunjucks(veiwsPath, templateOptions))

  // Routes
  for (const router of routers) {
    app.use(router.routes())
    app.use(router.allowedMethods())
  }

  return app
}

initServer()
  .then(app => {
    const server = app.listen(config.server.port, () => {
      console.log(chalk.cyan('------------------------'))
      console.log(chalk.cyan('Server is up!'))
      console.log(chalk.cyan(`Enviorment: ${config.env}`))
      console.log(chalk.cyan(`Listening on: http://localhost:${server.address().port}`))
      console.log(chalk.cyan('------------------------'))
    })
  })
  .catch(err => {
    console.error(chalk.bgRed(' -=Server Start up FAILED=- '))
    console.error(chalk.redBright(err))
    throw new Error(err)
  })

process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
)
