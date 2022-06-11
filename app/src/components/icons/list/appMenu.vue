<template>
  <svg :class="`icon_size_${size} icon_color_${color}`" width="24" height="24" viewBox="0 0 48 48" fill="currentColor" stroke="currentColor" :stroke-width="sWidth" xmlns="http://www.w3.org/2000/svg"><path d="M10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM24 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM38 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM10 28a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM24 28a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM38 28a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM10 42a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM24 42a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM38 42a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg>
</template>

<script>
export default {
  name: 'appMenu',
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
