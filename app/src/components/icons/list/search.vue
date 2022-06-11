<template>
  <svg :class="`icon_size_${size} icon_color_${color}`" width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" :stroke-width="sWidth" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" /><path d="M26.6568 14.3431C25.2091 12.8954 23.2091 12 21 12C18.7909 12 16.7909 12.8954 15.3431 14.3431"/><path d="M33.2218 33.2218L41.7071 41.7071"/></svg>
</template>

<script>
export default {
  name: 'search',
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
