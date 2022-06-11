<script>
import registerForm from '~/components/registerForm.vue'
import contentWell from '~/components/contentWell.vue'

export default {
  name: 'registerPage',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  components: {
    registerForm,
    contentWell
  }
}
</script>

<template>
  <div class="page">
    <h1>Create an Account</h1>

    <contentWell title="">
      <registerForm />
    </contentWell>
  </div>
</template>
