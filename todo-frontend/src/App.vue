<template>
  <div id="app">
    <Topbar />
    <Todos/>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'
import Topbar from './components/Topbar.vue'

export default {
  name: 'App',
  components: {
    Todos,
    Topbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Press Start 2P', cursive;
  color: #F4F4F4;
}

input {
  background: rgba(0,0,0,0);
  outline: none;
  border: none;
  font-size: 16px;
}

body {
  background: #1A1C2C;
}

#app {

}
</style>
