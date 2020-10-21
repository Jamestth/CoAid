<template>
  <div id="app">
    <div id="nav">
      <top-header></top-header>
    </div>
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";

export default {
  components: {
    "top-header": TopHeader
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cabin:wght@500");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500");
@import url("https://fonts.googleapis.com/css2?family=open+sans:wght@500");
@import url("https://fonts.googleapis.com/css2?family=Questrial:wght@500");

#app {
  font-size: 1vw;
  font-family: open+sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;
  margin: 0 !important;
  padding: 0 !important;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
