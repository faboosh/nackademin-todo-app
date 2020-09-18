<template>
  <form @submit="login">
    <h3>Get started!</h3>
    <p>Username</p>
    <input v-model="username" type="text">
    <p>Password</p>
    <input v-model="password" type="password">
    <small><span @click="accepted = !accepted" class="checkbox" :class="{checked: accepted}"></span><span> I have read and accept the <router-link to="privacypolicy">privacy policy</router-link> and <router-link to="cookiepolicy">cookie policy</router-link></span></small>

    <button class="accept">Sign in</button>
  </form>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      username: "",
      password: "",
      accepted: "",
    }
  },
  methods: {
    login(e) {
      const { username, password } = this;
      e.preventDefault();

      this.$axios.post('/auth', { username, password })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  small {
    font-size: 0.6em;
    padding-top: 1em;
    text-align: left;
    display: flex;
  }

  .checkbox {
    background: #333;
    border: 3px solid #555;
    height: 20px;
    margin-right: 5px;
    width: 20px;
    display: inline-block;
    position: relative;

    &.checked:after {
      position: absolute;
      content: "v";
      color: rgb(95, 189, 95);
      top: 0;
      left: 0; 
      font-size: 12px;
      font-family: 'Press Start 2P', cursive;
    }
  }
</style>
