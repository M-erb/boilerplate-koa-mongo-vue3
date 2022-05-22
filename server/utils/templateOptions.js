import config from '../config.js'
import { format, isValid } from 'date-fns'
import typeChecker from './typeChecker.js'

export default {
  opts: {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: false,
    noCache: config.env === 'development'
  },
  filters: {

    formatDate: (dateStr, formatStr) => {
      if (dateStr) {
        const date = new Date(dateStr)

        if (isValid(date)) {
          return format(date, formatStr || 'MM/dd/yyyy')
        } else return dateStr
      } else return dateStr
    },

    text2Para: str => {
      const re = /\r|\n/g
      let match
      let matches = 0
      let result

      // Find all indices of new lines
      while ((match = re.exec(str)) != null) {
        const index = match.index

        if (matches === 0) result = '<p>' + str.slice(0, index - 1)
        result = result + '</p><p>' + str.slice(index + 1)

        matches++
      }

      if (matches) {
        // Add closing p tag
        result = result + '</p>'

        return result
      } else return str
    },

    merge: (item, newItem) => {
      const ItemType = typeChecker.getType(item)
      const newItemType = typeChecker.getType(newItem)
      let result
      switch (ItemType) {
        case 'String':
          result = item + newItem
          break
        case 'Array':
          if (newItemType === 'Array') {
            result = item.concat(newItem)
          } else {
            result = item.push(newItem)
          }
          break
        case 'Object':
          if (newItemType === 'Object') {
            result = Object.assign(item, newItem)
          } else {
            result = item
          }
          break
        default:
          break
      }

      return result
    }

  },
  globals: {

    app: {
      env: config.env,
      host: config.server.host
    },

    utility: {
      uuid () {
        return Math.floor(100000 + Math.random() * 900000)
      }
    }

  },
  extensions: {},
  ext: '.njk'
}
