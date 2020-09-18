<template>
  <div id="cookie-policy" :class="{ collapsed: accepted }">
    <p>Hey there, please accept our <router-link class="link" to="/cookiepolicy">cookie policy</router-link> before using this application</p>
    <button @click="acceptCookies" class="accept">Accept</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      accepted: false
    }
  },
  props: {
    msg: String
  },
  methods: {
    acceptCookies() {
      this.accepted = true;
      localStorage.setItem('acceptedCookies', true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #cookie-policy {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.8em;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: .5s transform;

    button {
      font-size: 0.8em;
      padding: 0.8em;
    }

    p {
      font-size: 0.7em;
    }
  }

  .collapsed {
    transform: translateY(100%);
  }
</style>
