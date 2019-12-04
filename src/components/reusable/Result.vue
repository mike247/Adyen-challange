<template>
  <div class="result">
    <h1 class="result_name">{{result.name}}</h1>
    <p class="result_reason">{{reasons}}</p>
    <p class="result_text">{{result.address}}</p>
    <p class="result_text">{{result.city}}</p>
  </div>
</template>

<style scoped>
  .result {
    border: 1px solid #BBDEFB;
    border-radius: 5px;
    margin: 5px 0;
    padding: 10px 10px;
    background-color: white;
  }

  .result_name {
    font-size: 20px;
    color: #0D47A1;
    margin-top: 5px;
  }

  .result_reason {
    margin: 5px 0 10px 0;
    color: #263238;
    font-size: 18px;
    font-weight: bold;
  }

  .result_text {
    margin: 5px 0;
    color: #263238;
  }
</style>

<script>
export default {
  name: 'Result',
  props: {
    result: Object,
  },
  computed: {
    reasons() {
      let text = '';
      this.result.reasons.forEach((reason) => {
        if (text !== '') {
          text += ', ';
        }
        text += reason.summary;
      });
      return text;
    },
  },
};
</script>
