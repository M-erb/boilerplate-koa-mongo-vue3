<script>
import switchField from '~/components/fields/switchField.vue'
import contentWell from '~/components/contentWell.vue'
import { theme } from '~/main.js'

export default {
  name: 'settings',
  computed: {
    isDark: {
      get () {
        return theme.is === 'dark'
        return ''
      },
      set (bool) {
        if (bool) theme.is = 'dark'
        else theme.is = 'light'
      }
    }
  },
  components: {
    switchField,
    contentWell
  }
}
</script>

<template>
  <div class="page">
    <h1>My Settings</h1>

    <contentWell title="Theme">
      <switchField label="Theme" v-model="isDark" leftLabel="Light" rightLabel="Dark" />
    </contentWell>
  </div>
</template>
