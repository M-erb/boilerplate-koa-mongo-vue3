<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal_mask" @click="handleBgClose">
        <div class="modal_wrapper">
          <div class="modal_content">
            <div class="modal_close" v-if="allowClose">
              <btnCircle color="trans" size="sm" title="Search for Recipes" @click="handleBtnToggle">
                <icon name="x" color="text" size="4" sWidth="5" />
              </btnCircle>
            </div>

            <div class="modal_header" v-if="!hideHeader">
              <slot name="header"></slot>
            </div>

            <div class="modal_body">
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import icon from '~/components/icons/icon.vue'
import btnCircle from '~/components/btnCircle.vue'

export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    allowClose: {
      type: Boolean,
      default: true,
      required: false
    },
    hideHeader: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    handleBgToggle (e) {if (allowClose && (e.target === e.currentTarget)) this.$emit('toggle')},
    handleBtnToggle () {this.$emit('toggle')}
  },
  components: {
    icon,
    btnCircle
  },
  emits: ['toggle']
}
</script>

<style lang="pcss">
  .modal_mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-fade);
    transition: opacity 0.3s ease;

    display: flex;
    justify-content: center;
    align-items: center;

    & .modal_wrapper {
      flex: 1 1 auto;
      margin: var(--size-4);
      pointer-events: none;

      display: flex;
      justify-content: center;
      align-items: center;

      & .modal_content {
        pointer-events: auto;
        position: relative;
        flex: 1 1 auto;
        width: var(--size-full);
        max-width: var(--width-sm);
        min-width: var(--size-52);
        min-height: var(--size-48);
        padding: var(--size-4);
        background-color: var(--bg-sub);
        border: none;
        border-radius: var(--radius-xxl);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;

        & .modal_header {
          margin-bottom: var(--size-4);
        }

        & .modal_close {
          position: absolute;
          top: -24px;
          right: -24px;
        }
      }
    }
  }

  /* Vue transitions */
  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: scale(1.1);
  }
</style>
