<template>
  <div class="outer" v-if="appReady">
    <router-view :isLoggedIn="isLoggedIn" :user="user"></router-view>
    <router-view name="nav" :isLoggedIn="isLoggedIn" :user="user"></router-view>
  </div>

  <modal :show="status.isLoginModal" @toggle="() => status.isLoginModal = !status.isLoginModal" :allowClose="false">
    <template #header>
      <h3>You were logged out</h3>
    </template>
    <template #body>
      <loginForm :next="() => {}" />
    </template>
  </modal>
</template>

<script>
import { localDb, eventBus } from '~/main.js'
import { addAuth } from '~/util/axios.js'
import modal from '~/components/modal.vue'
import loginForm from '~/components/loginForm.vue'
import toast from '~/util/toasts.js'

export default {
  name: 'root',
  data() {
    return {
      appReady: false, // app will not render until this is true
      isLoggedIn: false,
      user: {},
      status: {
        isLoginModal: false
      }
    }
  },
  mounted () {
    // Check if we are online or not
    if (navigator.onLine !== undefined) {
      window.addEventListener('online', (e) => {
        if (process.env.NODE_ENV === 'development') console.log('navigator.onLine: ', navigator.onLine)
      })

      window.addEventListener('offline', (e) => {
        if (process.env.NODE_ENV === 'development') console.log('navigator.onLine: ', navigator.onLine)
      })
    }

    eventBus.on('needToLogBackIn', async res => {
      this.status.isLoginModal = true
      toast.warning('Warning: Need to log back in!')
    })

    eventBus.on('loggedbackin', async res => {
      this.status.isLoginModal = false
      toast.info('Welcome back!')
    })

    eventBus.emit('appIsMounted')
  },
  async created () {
    const token = await localDb.get('token')
    if (token) {
      await addAuth(token)
      this.isLoggedIn = true
    } else this.isLoggedIn = false

    const user = await localDb.get('user')
    if (user) this.user = user

    // Init the app
    this.appReady = true
  },
  components: {
    modal,
    loginForm
  }
}
</script>
