<template>
  <div id="topbar">
    <h2>TASKTRACKER.IO</h2>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  data() {
    return {

    }
  },

  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #topbar svg {
        width: 400px;
    }

    #topbar {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px;
        background: #333C57;
        border: 7px solid #566C86;
    }
    
    #topbar h2 {
        display: inline;
        margin: 0 auto;
    }
</style>
