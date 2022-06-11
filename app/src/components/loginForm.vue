<script>
import textField from '~/components/fields/textField.vue'
import switchField from '~/components/fields/switchField.vue'
import btn from '~/components/btn.vue'
import { login } from '~/requests/users'
import { eventBus } from '~/main.js'

export default {
  name: 'loginForm',
  data() {
    return {
      fields: {
        email: '',
        password: ''
      },
      showPass: false,
      status: {
        isLoading: false
      }
    }
  },
  components: {
    textField,
    switchField,
    btn
  },
  props: {
    next: {
      type: Function,
      default () {
        this.$router.push({ name: 'explore' })
      }
    }
  },
  computed: {
    submitIcon () {
      return this.status.isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-arrow-right'
    }
  },
  methods: {
    handleSubmit () {
      this.isLoading = true
      console.log('handleSubmit run')

      login(this.fields.email, this.fields.password)
        .then(res => {
          this.isLoading = false

          this.$root.user = res.data.user

          eventBus.emit('loggedbackin')
          this.next()
        }).catch(err => {
          console.error('login error: ', err)
        })
    }
  }
}
</script>

<template>
  <div class="login">
    <form @submit.prevent="handleSubmit">

      <textField label="Email" v-model="fields.email" />
      <textField label="Pasword" v-model="fields.password" :fieldType="showPass ? 'text' : 'password'" />
      <switchField label="Show Password?" v-model="showPass" />

      <div class="">
        <div class="fieldset">
          <router-link to="/register">Need an account?</router-link>
        </div>

        <btn type="submit" align="center">Login</btn>
      </div>

    </form>
    <p v-if="status.isLoading">Is Loading</p>
  </div>
</template>

<style lang="pcss">

</style>
