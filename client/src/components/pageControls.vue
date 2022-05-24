<script>
export default {
  name: 'pageControls'
}
</script>

<template>
  <header class="page_head">
    <div class="page_head_left">
      <slot name="left"></slot>
    </div>

    <div class="page_head_right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<style lang="pcss">
  .page_head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .page_head_left {
      flex: 0 0 auto;
    }

    & .page_head_right {
      flex: 0 0 auto;
    }
  }
</style>
