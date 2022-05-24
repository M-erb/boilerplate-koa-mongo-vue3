<template>
  <div class="content">
    <h3 class="content_title" v-if="title">{{ title }}</h3>

    <div class="content_well">
      <slot>Some Content</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentWell',
  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style lang="pcss">
  .content {
    margin: var(--size-5) 0;

    & .content_title {
      font-size: var(--scale-3);
      margin-left: var(--size-4);
      margin-bottom: var(--size-2);
    }

    & .content_well {
      background-color: var(--bg-sub);
      padding: var(--size-4);
      border: none;
      border-radius: var(--radius-xxl);
    }
  }
</style>
