const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')

module.exports = {
  plugins: [
    postcssImport(),
    postcssUrl(),
    postcssPresetEnv({
      stage: 1
    })
  ]
}
