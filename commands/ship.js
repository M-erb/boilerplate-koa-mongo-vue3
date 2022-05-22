// -------------------
// Ship off built files
// -------------------
import buildServer from './assembleFiles.js'
import chalk from 'chalk'
import dotenv from 'dotenv'
import inquirer from 'inquirer'
import notifier from 'node-notifier'
import env from './server/utils/env-cast.js'
import { execSync } from 'node:child_process'

dotenv.config({ path: '.env' })
const log = console.log

const shipCommand = env('SHIP', false)
const shipCommandProd = env('SHIP_PROD', false)
const prodHost = env('PROD_HOST', 'https://example.com')
const stagHost = env('STAG_HOST', 'https://beta.example.com')

async function init () {
  log(chalk.bgBlueBright('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'))
  log(chalk.bgBlueBright('-==Lets get this thing shipped!==-'))
  log(chalk.bgBlueBright('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'))

  if (!shipCommand || !shipCommandProd) {
    log(chalk.redBright('> Oops, I ether cannot find a ".env" file or the ship commands are not given there.'))
    return
  }

  const questions = [
    {
      type: 'confirm',
      name: 'shouldBuild',
      message: 'Should I run the build command?'
    },
    {
      type: 'list',
      name: 'envTo',
      message: 'Which Enviorment?',
      choices: [
        {
          name: 'Staging',
          value: 'stag'
        },
        {
          name: 'Production',
          value: 'prod'
        }
      ]
    },
    {
      type: 'list',
      name: 'isConfirmed',
      message: 'Are you sure you want to ship to prod?',
      choices: [
        {
          name: 'No',
          value: false,
          short: '"No" - Cancelled ship'
        },
        {
          name: 'Yes',
          value: true,
          short: 'Yes'
        }
      ],
      when (curAnswers) {
        return curAnswers.envTo === 'prod'
      }
    }
  ]

  const answers = await inquirer.prompt(questions)

  if (answers.envTo === 'prod' && !answers.isConfirmed) {
    log('')
    log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
    log('.....' + chalk.red('CANCELLED!...........'))
    log('.....' + chalk.red('ENV: Prod............'))
    log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
    log('')

    return
  }

  let isBuildErr = false
  if (answers.shouldBuild) {
    await buildServer().catch(err => {
      errorNoty(err)
      isBuildErr = true
    })
  }
  if (isBuildErr) return

  if (answers.envTo === 'prod' && !shipCommandProd) return log(chalk.bgRed('Oops, I cannot find the SHIP_PROD command'))
  if (answers.envTo === 'stag' && !shipCommand) return log(chalk.bgRed('Oops, I cannot find the SHIP command'))

  const executeOrder = `rsync -rvzz ./.server-ready-build/ ${answers.envTo === 'prod' ? shipCommandProd : shipCommand} --progress`

  try {
    execSync(executeOrder, { stdio: [0, 1, 2] })
  } catch (error) {
    return errorNoty(error)
  }

  notifier.notify({
    title: `SHIPPED to ${answers.envTo === 'stag' ? 'Staging' : 'Prod'}`,
    message: 'redirecthealth.com'
  })

  log('')
  log('.....' + chalk.bgGreen('=-=-=-=-=-=-=-=-=-=-='))
  log('.....' + chalk.green('SHIPPED!'))
  log('.....' + chalk.green(`ENV: ${answers.envTo === 'stag' ? 'Staging' : 'Prod'}`))
  log('.....' + chalk.green(`${answers.envTo === 'stag' ? stagHost : prodHost}`))
  log('.....' + chalk.bgGreen('=-=-=-=-=-=-=-=-=-=-='))
  log('')
}

function errorNoty (err) {
  notifier.notify({
    title: 'SHIPPED FAIILD',
    message: 'redirecthealth.com - check console'
  })

  log('')
  log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
  log('.....' + chalk.red('Something went wrong with the ship command, please check it'))
  log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
  log('')

  log(chalk.red(err))
}

init()
