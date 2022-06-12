<template>
  <button :class="`btn ${align} size_${size}`" :type="type">
    <span><slot>Button</slot></span>
    <span v-if="icon.name"><icon :name="icon.name" :sWidth="icon.sWidth" :size="icon.size" :color="icon.color" /></span>
  </button>
</template>

<script>
import icon from '~/components/icons/icon.vue'

export default {
  name: 'btn',
  props: {
    align: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    size: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: Object,
      required: false,
      default () {
        return {
          name: ''
        }
      }
    }
  },
  components: {
    icon
  }
}
</script>

<style lang="pcss">
  .btn {
    background-color: var(--color-teal-300);
    color: var(--color-grey-700);
    font-size: var(--scale-3);
    font-weight: bold;
    text-align: center;
    margin: var(--size-5) 0;
    padding: var(--size-4);
    min-width: 280px;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    & > span {
      display: block;
      flex: 1 1 auto;
    }

    &.full {
      width: 100%;
      max-width: var(--width-sm);
      margin-left: auto;
      margin-right: auto;
    }

    &.center {
      margin-left: auto;
      margin-right: auto;
    }

    &.right {
      margin-left: auto;
      margin-right: 0;
    }

    &.left {
      margin-left: 0;
      margin-right: auto;
    }

    &.size_sm {
      min-width: auto;
      font-size: var(--scale-1);
      padding: var(--size-2);

      & > span {
        padding: 0 var(--size-2);
      }
    }
  }
</style>
