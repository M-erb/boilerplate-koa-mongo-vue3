import { createApp } from 'vue'
import router from '~/router.js'
import Root from '~/root.vue'
import '~/styles/main.pcss'
import { LocalDb } from '~/util/localDb'
import nanobus from 'nanobus'
import themeSwitcher from './util/themeSwitcher'

export const localDb = LocalDb('app', 'v1')
export const eventBus = nanobus()

eventBus.on('*', (eventName, data, perfTimingId) => {
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
  console.log(`EventBus - ${eventName}`)
  console.log(`EventBus - ${eventName} data:`, data)
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
})

const app = createApp(Root)

// Enable dev tools
window.postMessage({
  devtoolsEnabled: true,
  vueDetected: true
}, '*')

app.use(router)
app.mount('#app')

themeSwitcher.init()
export const theme = themeSwitcher
