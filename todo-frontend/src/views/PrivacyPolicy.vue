<template>
  <div class="cookie-policy">
    <h2>Our privacy policy</h2>
    <h3>What data do we save?</h3>
    <ul>
      <li>Usernames and encrypted passwords to enable login functionality</li>
      <li>Todo lists and todo items</li>
      <li>Form data, where the user enters data that needs to be persistent for the application to function. We only save a bare minimum of data, for example which username you chose, or the title of todo lists or todos. None of this data is analyzed, sold, or used for advertising.</li>
    </ul>
    <h3>What data have we saved about you?</h3>
    <p>Log in and head on over to <router-link to="/profile">this page</router-link>, and you will be presented with a full overview of all your data.</p>
    <h3>What if you want to remove your data?</h3>
    <p>Simple! Log in and head on over <router-link to="/profile">here</router-link> and choose "Remove all data". Your account, along with all todo lists and todos that you have created will be removed permanently.</p>
  </div>
</template>

<style lang="scss">
  .cookie-policy {
    padding: 60px;
    max-width: 1000px;
    margin: 50px auto;
    background: #222;

    ul {
      margin-top: 10px;
      margin-bottom: 30px;
      li {
        margin-bottom: 15px;
      }
    }

    h2 {
      margin-bottom: 30px;
    }

    p {
      margin-bottom: 30px
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
