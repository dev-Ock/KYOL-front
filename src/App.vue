<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.pushable {
  background: hsl(0, 0%, 90%);
  border-radius: 50% / 25%;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 1px;
  margin-top: 50px;
  height: 30px;
  width: 100px;
  text-align: center;
}
.front {
  display: block;
  padding: 14px 12px;
  border-radius: 50% / 25%;
  font-size: 1rem;
  background: hsl(345deg 100% 47%);
  color: black;
  transform: translateY(-8px);
  height: 15px;
  width: 100px;
  /* vertical-align: 20%; */
  justify-content: flex-start;
}

.pushable:active .front {
  transform: translateY(-2px);
}
@import url('https://fonts.googleapis.com/css2?family=Hahmlet&display=swap');
</style>
