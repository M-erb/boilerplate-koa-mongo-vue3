<template>
  <svg  width="24" height="24" viewBox="0 0 24 24" :class="`icon_size_${size} icon_color_${color}`" fill="none" stroke="currentColor" :stroke-width="sWidth" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v18M6 3l4 4M6 3L2 7"/><path d="M18 21V3m0 18l4-4m-4 4l-4-4"/></svg>
</template>

<script>
export default {
  name: 'arrowUpDown',
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
