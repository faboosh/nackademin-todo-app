<template>
  <form @submit="login">
    <h3>Get back in the action!</h3>
    <p>Username</p>
    <input v-model="username" type="text">
    <p>Password</p>
    <input v-model="password" type="password">
    <small>Don't have an account? <router-link to="/">Sign up!</router-link></small>

    <button class="accept">Sign in</button>
  </form>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      username: "",
      password: ""
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
    font-size: 0.7em;
    padding-top: 1em;
    text-align: left;
  }
</style>
