<template>
  <div class="fieldset">
    <label class="switch_field">
      <div class="switch_input_wrap">
        <span v-if="leftLabel">{{ leftLabel }}</span>
        <input type="checkbox" name="checkbox" v-model="value" />
        <span v-if="rightLabel">{{ rightLabel }}</span>
      </div>
      <span class="label" v-if="label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SwitchField',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      default: '',
      required: false
    },
    fieldName: {
      type: String,
      default: '',
      required: false
    },
    fieldType: {
      type: String,
      default: 'text',
      required: false
    },
    rightLabel: {
      type: String,
      default: '',
      required: false
    },
    leftLabel: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style lang="pcss">
  .fieldset {
    & label.switch_field {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--size-2);

      & .switch_input_wrap {
        flex: 1 1 auto;
        order: 1;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        & span {
          flex: 0 0 auto;
          user-select: none;

          &:first-child {
            margin-right: var(--size-2);
          }

          &:last-child {
            margin-left: var(--size-2);
          }
        }

        & input {
          flex: 0 0 auto;
        }
      }

      & input {
        appearance: none;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        border: 0;
        outline: 0;
        width: 60px;
        height: 30px;
        margin: 0;

        transition: all ease 0.3s;
        cursor: pointer;

        /* switch background */
        &::after {
          content: '';
          width: 60px;
          height: 30px;
          display: inline-block;
          background: var(--color-grey-400);
          border-radius: 18px;
          transition: ease .3s;
        }

        /* Swtich toggle */
        &::before {
          content: '';
          width: 24px;
          height: 24px;
          display: block;
          position: absolute;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background: rgb(255, 255, 255);
          box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
          transition: ease .3s;
        }

        &:checked::before {
          left: 32px;
          box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.4);
        }

        &:checked::after {
          background: var(--color-teal-300);
        }

        @nest &:focus + .label {
          color: var(--text-color-1);
        }
      }

      & .label {
        display: block;
        font-size: var(--scale-00);
        font-weight: var(--weight-bold);
        color: var(--text-color-2);
        margin-bottom: var(--size-2);
        user-select: none;
        order: 0;
        transition: color 0.3s;
      }
    }
  }
</style>
