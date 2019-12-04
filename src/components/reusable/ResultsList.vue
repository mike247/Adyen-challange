<template>
  <div class="resultsList">
    <div v-for="result in results" :key="result.name">
        <h1 class="resultsList_name">{{result.name}}</h1>
        <div v-for="location in result.locations" :key="location.id">
          <Result :result="location" />
        </div>
    </div>
  </div>
</template>

<style scoped>
  .resultsList {
    overflow: scroll;
    max-height: 75vh;
  }

  .resultsList_name {
    font-size: 24px;
    color: #37474F;
  }
</style>


<script>
import Result from './Result.vue';

export default {
  name: 'ResultsList',
  components: {
    Result,
  },
  props: {
    results: Array,
  },
};
</script>
