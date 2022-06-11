<template>
  <svg width="24" height="24" viewBox="0 0 24 24" :class="`icon_size_${size} icon_color_${color}`" fill="none" stroke="currentColor" :stroke-width="sWidth" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
</template>

<script>
export default {
  name: 'arrowRight',
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
