<script>
import loginForm from '~/components/loginForm.vue'
import contentWell from '~/components/contentWell.vue'

export default {
  name: 'loginPage',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  components: {
    loginForm,
    contentWell
  }
}
</script>

<template>
  <div class="page">
    <h1>Quick Login!</h1>

    <contentWell title="">
      <loginForm />
    </contentWell>
  </div>
</template>
