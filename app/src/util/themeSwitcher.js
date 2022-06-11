const theme = {
  get is () {
    const savedName = localStorage.getItem('appTheme') || false
    if (savedName) return savedName
    else {
      return this.switchTheme('light')
    }
  },
  set is (name) {
    return this.switchTheme(name)
  },
  switchTheme (themeName) {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset.theme = themeName
    localStorage.setItem('appTheme', themeName)
    return themeName
  },
  init () {
    this.switchTheme(this.is)
  }
}

export default theme
