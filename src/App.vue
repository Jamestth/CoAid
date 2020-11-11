<template>
  <div>
    <div id="nav">
      <top-header v-if="auth.currentUser"></top-header>
    </div>
    <div id="app">
      <router-view />
    </div>
    <div id="backgroundcolorfooter" v-if="!auth.currentUser"></div>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import { auth } from "./assets/firebase";
export default {
  components: {
    "top-header": TopHeader
  },
  data() {
    return {
      auth: auth
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@500");

#app {
  font-size: 2vh;
  font-family: "DM Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 96vh;
  overflow-y: auto;
  overflow-x: hidden;
}
#backgroundcolorfooter {
  background-color: #d3edf9;
  height: 4vh;
}
#nav {
  margin: 0 !important;
  padding: 0 !important;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  margin-bottom: 0;
}
body {
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #4895ef;
  border-radius: 20px;
  transition: 0.3s;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #20368f;
}
</style>
