<template>
  <div class="fieldset">
    <label class="text_field">
      <input :name="fieldName" :type="fieldType" v-model="value" />
      <span class="label" v-if="label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    modelValue: {
      type: String,
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
    & label.text_field {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--size-2);

      & input {
        display: block;
        font-size: var(--scale-0);
        font-weight: var(--weight-bold);
        padding: var(--size-2) 0;
        color: var(--text-color);
        min-width: 300px;
        border-top: none;
        border-right: none;
        border-left: none;
        border-bottom: 2px solid var(--color-grey-300);
        background-color: transparent;
        transition: all 0.3s;
        order: 1;

        &:focus {
          outline: none;
          border-bottom: 2px solid var(--color-teal-300);
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
        margin-bottom: 0;
        user-select: none;
        order: 0;
        transition: color 0.3s;
      }
    }
  }
</style>
