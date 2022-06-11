<script>
import textField from '~/components/fields/textField.vue'
import switchField from '~/components/fields/switchField.vue'
import btn from '~/components/btn.vue'
import { registerUser } from '~/requests/users'
import toast from '~/util/toasts.js'

export default {
  name: 'registerForm',
  data() {
    return {
      fields: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        this.$router.push({ name: 'login' })
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

      const {
        userName,
        email,
        password,
        confirmPassword
      } = this.fields

      if (password !== confirmPassword) {
        toast.error('Passwords must match!')
        return
      }

      if (password === '' || confirmPassword === '') {
        toast.error('Password is required')
        return
      }

      if (userName === '') {
        toast.error('User Name is required')
        return
      }

      if (email === '') {
        toast.error('Email is required')
        return
      }

      registerUser({ userName, email, password })
        .then(res => {
          this.isLoading = false

          this.$root.user = res.data.user
          toast.info('Registered! Now just login and get to it')

          this.next()
        }).catch(err => {
          console.error('register error: ', err)

          if (err.data.key === 'userName') return toast.info('User Name is already taken')
          if (err.data.key === 'email') return toast.info('Email is already taken')

          toast.info(err.data.message)
        })
    }
  }
}
</script>

<template>
  <div class="login">
    <form @submit.prevent="handleSubmit">

      <textField label="User Name" v-model="fields.userName" />
      <textField label="Email" v-model="fields.email" />
      <textField label="Pasword" v-model="fields.password" :fieldType="showPass ? 'text' : 'password'" />
      <textField label="Confirm Pasword" v-model="fields.confirmPassword" :fieldType="showPass ? 'text' : 'password'" />
      <switchField label="Show Password?" v-model="showPass" />

      <div class="">
        <div class="fieldset">
          <router-link to="/login">Already have an account?</router-link>
        </div>

        <btn type="submit" align="center">Register</btn>
      </div>

    </form>
    <p v-if="status.isLoading">Is Loading</p>
  </div>
</template>

<style lang="pcss">

</style>
