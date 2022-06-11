import '~/styles/main.pcss'
import themeSwitcher from './util/themeSwitcher'

themeSwitcher.init()
export const theme = themeSwitcher

window.addEventListener('DOMContentLoaded', () => {
  // Detect Visitor's prefered theme mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.is = 'dark'
  }

  const themeswitchControl = document.querySelector('#themeswitcher') ?? false
  if (themeswitchControl) {
    const currentTheme = theme.is
    if (currentTheme === 'dark') themeswitchControl.checked = true

    themeswitchControl.addEventListener('change', () => {
      if (themeswitchControl.checked) theme.is = 'dark'
      else theme.is = 'light'
    })
  }
})
