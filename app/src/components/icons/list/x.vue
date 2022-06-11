<template>
  <svg width="24" height="24" viewBox="0 0 24 24" :class="`icon_size_${size} icon_color_${color}`" fill="none" stroke="currentColor" :stroke-width="sWidth" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="21.924" x2="2.2099" y1="2.1154" y2="21.83"/>
  <line x1="2.2099" x2="21.924" y1="2.1154" y2="21.83"/></svg>
</template>

<script>
export default {
  name: 'minus',
  props: {
    size: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    sWidth: {
      type: String,
      required: false
    }
  },
}
</script>
