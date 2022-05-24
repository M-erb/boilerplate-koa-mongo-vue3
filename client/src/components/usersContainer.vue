<template>
  <div class="users_container">
    <div class="status_space" v-if="isLoading">
      <!-- <ProgressSpinner /> -->
      <p>is loading...</p>
    </div>

    <div class="status_space" v-if="!isLoading && !items.length">
      <p>Looks like there aren't any users yet...</p>
    </div>

    <a class="users_list" v-for="item in items" :key="item._id">

      <div class="users_list_title_space">
        <p class="users_list_title">name: {{ item.userName }}</p>
        <p class="users_list_owner">email: {{ item.email || '---' }}</p>
      </div>

      <div class="items_list_icon_space">
        <icon name="arrowRight" color="teal" sWidth="4" />
      </div>

    </a>
  </div>
</template>

<script>
import icon from '~/components/icons/icon.vue'
import btn from '~/components/btn.vue'
import btnCircle from '~/components/btnCircle.vue'

export default {
  name: 'usersContainer',
  components: {
    icon,
    btn,
    btnCircle
  },
  props: {
    items: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    isLoading: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    }
  },
  methods: {
    test (msg) {
      console.log('test click: ', msg)
    }
  }
}
</script>

<style lang="pcss">
  .users_list {
    background-color: var(--bg-sub);
    padding: var(--size-4);
    border: none;
    border-radius: var(--radius-xxl);
    margin: var(--size-8) 0;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & .users_list_title_space {
      flex: 1 1 auto;
    }

    & .users_list_title {
      font-size: var(--scale-2);
      font-weight: var(--weight-bold);
    }

    & .users_list_owner {
      font-size: var(--scale-1);
      font-weight: var(--weight-bold);
      color: var(--text-color-1);
    }

    & .users_list_icon_space {
      flex: 0 0 auto;
    }

    & .users_list_controls {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: var(--size-2) var(--size--1) 0 var(--size--1);

      & .users_list_control {
        flex: 0 0 auto;
        padding: var(--size-1);
      }
    }
  }
</style>
