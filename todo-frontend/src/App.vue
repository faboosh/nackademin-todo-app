<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  .rainbow-bg-text {
      text-shadow:
          -1px -1px 0 #000,  
          1px -1px 0 #000,
          -1px 1px 0 #000,
          1px 1px 0 #000,
          0px 4px 0px #3273ff,
          0px 4px 2px #3273ff,
          0px 6px 0px #9532ff,
          0px 6px 4px #9532ff,
          0px 9px 0px #ff3232,
          0px 9px 6px #ff3232,
          0px 12px 0px #ff9932,
          0px 12px 8px #ff9932,
          0px 15px 0px #32ff40,
          0px 15px 10px #32ff40;
  }


  * {
    color: #eee;
    font-family: 'Press Start 2P', cursive;
    padding: 0;
    box-sizing: border-box;
    margin: 0;
  }

  body {
    //background: #111;
    min-height: 100vh;
    background-image: 
      radial-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)),
      repeating-linear-gradient(0deg,  
                                rgba(0,0,0,0) 0,
                                rgba(0,0,0,0) 10px,
                                #181818 10px,
                                #181818 20px,
                                ),
      repeating-linear-gradient(135deg,  
                                rgba(0,0,0,0) 0,
                                rgba(0,0,0,0) 10px,
                                #181818 10px,
                                #181818 20px,
                                ),
      repeating-linear-gradient(45deg,  
                                #111 0,
                                #111 10px,
                                #181818 10px,
                                #181818 15px,
                                )


                     
  }

  #nav {
    background: #222;
    padding: 10px;
    display: flex;
    justify-content: flex-start;

    a {
      text-decoration: none;
      margin-right: 10px;
      font-size: 0.8em;
    }
  }

  input, button {
    outline: none;
    border: 3px solid #333;
    background: #333;
    font-size: 1em;
    padding: 10px 5px;

    &:focus {
      border: 3px solid #444;
    }
  }

  form {
    display: flex;
    background: #222;
    flex-direction: column;
    padding: 4em 4em;

    input {
      margin-bottom: 2em;

      &:last-of-type {
        margin-bottom: 0;
      } 
    }

    button {
      padding: 1.5em;
      margin-top: 2em;

      &:last-of-type {
        margin-bottom: 0;
      } 
    }

    & p {
      margin-bottom: 5px;
    }

    & h3 {
      margin-bottom: 2em;
    }
  }

  .rainbow-bg-text {
    text-shadow:
        -1px -1px 0 #000,  
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000,
        0px 4px 0px #3273ff,
        0px 4px 2px #3273ff,
        0px 6px 0px #9532ff,
        0px 6px 4px #9532ff,
        0px 9px 0px #ff3232,
        0px 9px 6px #ff3232,
        0px 12px 0px #ff9932,
        0px 12px 8px #ff9932,
        0px 15px 0px #32ff40,
        0px 15px 10px #32ff40;
  }

  .accept {
    border: none;
    background: rgb(83, 170, 83);
    transition: .2s background;

    &:hover {
      background: rgb(95, 189, 95);
    }
  }
</style>
