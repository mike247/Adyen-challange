<template>
  <button class="button" @click="clickHandlerWrapper" :disabled="disabled">{{text}}</button>
</template>

<style scooped>
  .button {
    height: 40px;
    background-color: #1565C0;
    color: white;
    font-size: 16px;
    border: 0px;
    border-radius: 5px;
    padding: 0px 30px;
  }

  .button:disabled {
    opacity: 0.5;
  }
</style>

<script>
import helpers from '../../utils/helpers';

export default {
  name: 'CustomButton',
  props: {
    text: String,
    clickEvent: String,
    disabled: Boolean,
    debounce: Boolean,
  },
  methods: {
    debouncedHandleClick: helpers.debounce(function dbhc() {
      this.$emit(this.clickEvent);
    }, 250),
    handleClick() {
      this.$emit(this.clickEvent);
    },
    clickHandlerWrapper() {
      if (this.debounce) {
        this.debouncedHandleClick();
      } else {
        this.handleClick();
      }
    },
  },
};
</script>
