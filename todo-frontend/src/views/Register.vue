<template>
  <div class="home">
    <div id="hero">
      <RegisterForm class="login-form"/>
    </div>
    <CookiePolicy/>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue'
import CookiePolicy from '@/components/CookiePolicy.vue'

export default {
  name: 'Home',
  components: {
    RegisterForm,
    CookiePolicy
  }
}
</script>

<style lang="scss">

  .login-form {
    max-width: 580px;
    margin: 0 auto;
  }
</style>
