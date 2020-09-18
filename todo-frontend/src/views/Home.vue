<template>
  <div class="home">
    <div id="hero">
      <div class="text">
        <div class="title">
          <h1 class="rainbow-bg-text">TASKTRACKER</h1>
        </div>
        <h4>A neater way to organize your tasks</h4>
      </div>
      <LoginForm class="login-form"/>
    </div>
    <CookiePolicy/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'
import CookiePolicy from '@/components/CookiePolicy.vue'

export default {
  name: 'Home',
  components: {
    LoginForm,
    CookiePolicy
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
