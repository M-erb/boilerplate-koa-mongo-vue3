// -------------------
// Generate server ready files
// ready to be shipped
// -------------------
import path from 'node:path'
import fse from 'fs-extra'
import notifier from 'node-notifier'
import config from '../server/config.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const root = path.join(__dirname, '../../')
const destFolder = path.join(root, '.server-ready-build')

export default async () => {
  // Delete destination folder first
  // to start fresh
  let isErr = false
  await fse.remove(destFolder).catch(err => {
    console.error('fse.remove error: ', err)
    isErr = true
  })
  await fse.ensureDir(destFolder).catch(err => {
    console.error('fse.ensureDir error: ', err)
    isErr = true
  })

  if (isErr) {
    notifier.notify({
      title: 'BUILD FAILD',
      message: 'redirecthealth.com - check console'
    })
    throw new Error('Build Failed')
  }

  for (const fileName of config.buildFilesList) {
    const file = path.join(root, fileName)
    const dest = path.join(destFolder, fileName)
    await fse.copy(file, dest).catch(err => console.error(`fse.copy error ${fileName}: `, err))
  }

  notifier.notify({
    title: 'BULD DONE',
    message: 'redirecthealth.com'
  })

  return `Build done ${destFolder}`
}
