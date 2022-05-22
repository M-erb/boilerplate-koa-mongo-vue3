// -------------------
// Generate server ready files
// ready to be shipped
// -------------------

import buildServer from './assembleFiles.js'
import chalk from 'chalk'

const log = console.log

buildServer()
  .then(res => {
    log(chalk.bgGreen(res))
  })
  .catch(err => {
    console.error(chalk.bgRed(err))
  })
