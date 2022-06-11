<template>
  <svg width="24" height="24" viewBox="0 0 16 16" :class="`icon_size_${size} icon_color_${color}`" fill="none" stroke="currentColor" :stroke-width="sWidth" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M2 8h6m6 0H8m0 0V2m0 6v6"/></svg>
</template>

<script>
export default {
  name: 'plus',
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
