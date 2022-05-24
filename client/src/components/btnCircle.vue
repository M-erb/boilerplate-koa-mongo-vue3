<template>
  <button :class="`btn_circle ${align} color_${color} ${size}`">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'btnCircle',
  props: {
    align: {
      type: String,
      required: false,
      default: ''
    },
    color: {
      type: String,
      required: false,
      default: 'teal'
    },
    size: {
      type: String,
      required: false,
      default: 'md'
    }
  }
}
</script>

<style lang="pcss">
  .btn_circle {
    background-color: var(--color-teal-300);
    color: var(--color-grey-700);
    font-size: var(--scale-3);
    font-weight: bold;
    text-align: center;
    padding: var(--size-1);
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    width: 48px;
    height: 48px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    &.color_red {
      background-color: var(--color-red-300);
    }

    &.color_trans {
      background-color: var(--color-transparent);
    }

    &.color_grey {
      background-color: var(--bg);
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

    &.sm {
      width: 32px;
      height: 32px;
    }

    &.lg {
      width: 64px;
      height: 64px;
    }
  }
</style>
