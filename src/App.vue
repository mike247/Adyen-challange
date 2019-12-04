<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f0f0f0;
  }
</style>

<script>
export default {
  name: 'App',
};
</script>
