<template>
  <div id="app">
    <div class="container">
      <NewTodo/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NewTodo from './components/NewTodo';
export default {
  name: 'App',
  components: {
    NewTodo
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .container {
    padding-top: 30px;
  }
}
</style>
