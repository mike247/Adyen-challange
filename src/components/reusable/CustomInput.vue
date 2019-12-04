<template>
  <input
    class="customInput"
    type="text"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    @input="handleInput"
  />
</template>

<style scooped>
  .customInput {
    height: 40px;
    font-size: 16px;
    border: 1px solid #1E88E5;
    border-radius: 5px;
    padding: 0px 10px;
    width: 100%;
  }

  .customInput:disabled {
    opacity: 0.5;
  }
</style>

<script>
export default {
  name: 'CustomInput',
  props: {
    placeholder: String,
    name: String,
    inputEvent: String,
    disabled: Boolean,
  },
  methods: {
    handleInput(e) {
      if (this.inputEvent) {
        this.$emit(this.inputEvent, e);
      }
    },
  },
};
</script>
