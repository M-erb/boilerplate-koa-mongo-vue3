<template>
  <component class="icon" :is="name" :size="size" :color="color" :sWidth="sWidth" ></component>
</template>

<script>
import bookMark from './list/bookMark.vue'
import appMenu from './list/appMenu.vue'
import search from './list/search.vue'
import plus from './list/plus.vue'
import arrowUpDown from './list/arrowUpDown.vue'
import x from './list/x.vue'
import arrowRight from './list/arrowRight.vue'
import arrowLeft from './list/arrowLeft.vue'

export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: String,
      required: false,
      default: '6'
    },
    color: {
      type: String,
      required: false,
      default: ''
    },
    sWidth: {
      type: String,
      required: false,
      default: '2'
    }
  },
  components: {
    bookMark,
    appMenu,
    search,
    plus,
    arrowUpDown,
    x,
    arrowRight,
    arrowLeft
  }
}
</script>

<style lang="pcss">
  .icon {
    display: block;
    flex: 0 0 auto;

    & svg {
      display: block;
      flex: 0 0 auto;
    }
  }

  .icon_size_4 {
    width: var(--size-4);
    height: var(--size-4);
  }

  .icon_size_6 {
    width: var(--size-6);
    height: var(--size-6);
  }

  .icon_size_9 {
    width: var(--size-9);
    height: var(--size-9);
  }

  .icon_size_12 {
    width: var(--size-12);
    height: var(--size-12);
  }

  .icon_color_text {
    color: var(--text-color);
  }

  .icon_color_grey {
    color: var(--color-grey-800);
  }

  .icon_color_grey_light {
    color: var(--color-grey-400);
  }

  .icon_color_teal {
    color: var(--color-teal-300);
  }
</style>
