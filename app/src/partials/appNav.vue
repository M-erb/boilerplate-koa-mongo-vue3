<script>
import icon from '~/components/icons/icon.vue'

export default {
  name: 'appNav',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  components: {
    icon
  }
}
</script>

<template>
  <div class="appNav_wrap">
    <div class="appNav">
      <div class="appNav_inner">
        <router-link to="/does-not-exist" title="future">
          <icon name="bookMark" size="12" sWidth="2" />
          <span>Todo</span>
        </router-link>
        <router-link to="/does-not-exist2" title="future">
          <icon name="plus" size="12" sWidth="3" />
          <span>Todo</span>
        </router-link>
        <router-link to="/explore" title="Explore">
          <icon name="search" size="12" sWidth="4" />
          <span>Explore</span>
        </router-link>
        <router-link to="/settings" title="Settings">
          <icon name="appMenu" size="12" sWidth="2" />
          <span>More</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="pcss">
  .appNav_wrap {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;

    & .appNav {
      background-color: var(--bg-sub);
      border-color: var(--border-color);
      border-style: solid;
      border-top-width: 2px;
      margin: 0 auto;

      & .appNav_inner {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        max-width: 480px;
        margin: 0 auto;

        & a {
          display: block;
          flex: 0 0 auto;
          padding: var(--size-3);
          text-decoration: none;
          color: var(--text-color-2);

          & svg {
            display: block;
            margin: 0 auto;
            transition: color 0.3s ease-in-out;
          }

          & span {
            display: block;
            text-align: center;
            transition: color 0.3s ease-in-out;
          }

          /* Vue router's active class */
          &.router-link-active {
            color: var(--text-color);
          }
        }
      }
    }

    @media (min-width: 768px) {
      & {
        padding-bottom: var(--size-4);

        & .appNav {
          border-radius: var(--radius-xxl);
          max-width: var(--width-xs);
          border-width: 2px;
        }
      }
    }
  }
</style>
