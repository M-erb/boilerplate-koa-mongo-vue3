<script>
import textField from '~/components/fields/textField.vue'
import switchField from '~/components/fields/switchField.vue'
import btn from '~/components/btn.vue'
import btnCircle from '~/components/btnCircle.vue'
import contentWell from '~/components/contentWell.vue'
import icon from '~/components/icons/icon.vue'
import { theme } from '~/main.js'

export default {
  name: 'componentsPage',
  data () {
    return {
      textfield: 'This is a string for text field',
      bool: false,
      pass: 'th1s ls a 7assw0rd',
      showPass: false
    }
  },
  computed: {
    isDark: {
      get () {
        return theme.is === 'dark'
      },
      set (bool) {
        if (bool) theme.is = 'dark'
        else theme.is = 'light'
      }
    }
  },
  components: {
    textField,
    switchField,
    contentWell,
    btn,
    btnCircle,
    icon
  }
}
</script>

<template>
  <div class="page">
    <h1>Components Page</h1>

    <contentWell title="Fields">
      <textField label="Text Field Label" v-model="textfield" />
      <switchField :label="`Switch Field Label ${bool}`" v-model="bool" leftLabel="Left" rightLabel="Right" />
    </contentWell>

    <contentWell title="Show Password">
      <textField label="Text Field Label" v-model="pass" :fieldType="showPass ? 'text' : 'password'" />
      <switchField label="Show Password?" v-model="showPass" />
    </contentWell>

    <contentWell title="Theme">
      <switchField label="Theme" v-model="isDark" leftLabel="Light" rightLabel="Dark" />
    </contentWell>

    <contentWell title="Buttons">
      <btn align="full">Full Btn</btn>
      <btn align="left">Default Left</btn>
      <btn align="center">Center Btn</btn>
      <btn align="right" title="test the title">Right Btn</btn>
      <btnCircle align="" title="Add Item"><icon name="plus" sWidth="3" /></btnCircle>
      <btnCircle align="right" color="red" title="Delete Item"><icon name="x" size="4" sWidth="6" /></btnCircle>
      <btnCircle align="" title="Add Item" size="sm"><icon name="plus" size="4" sWidth="3" /></btnCircle>
      <btnCircle align="" title="Add Item" size="md"><icon name="plus" sWidth="3" /></btnCircle>
      <btnCircle align="" title="Add Item" size="lg"><icon name="plus" sWidth="3" /></btnCircle>
    </contentWell>

    <div class="content">
    </div>
  </div>
</template>
