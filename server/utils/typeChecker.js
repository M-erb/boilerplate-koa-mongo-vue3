export default {
  isType (value, typeName) {
    const valueType = this.getType(value)
    const result = valueType === typeName
    return result
  },
  getType (item) {
    const valueType = Object.prototype.toString.call(item).slice(8, -1)
    return valueType
  }
}
