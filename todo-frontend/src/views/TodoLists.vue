<template>
  <div class="home">
    lol
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'TodoLists',
  components: {
  }
}
</script>

<style lang="scss">
  #hero {
    padding: 10em 4em;
    display: flex;

    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      flex-grow: 1;
      .title {
        perspective: 200px;
        display: inline-block;
        margin-bottom: 2em;
        background: none;
        padding: 0 2em;


        h1 {
            transform: rotateX(8deg) scale(1, 1.2) translate(0.2%, -25%);
            z-index: 1;
            background: none;
            
            font-size: 4vw;
        }
      }
    }

  }

  .login-form {
    max-width: 580px;
  }
</style>
