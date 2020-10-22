<template>
  <b-container fluid>
    <div class="navGroup">
      <b-navbar toggleable="lg">
        <b-navbar-brand class="pl-3 ">
          <img src="../assets/LogoIcon.png" class="m-2" width="150" />
        </b-navbar-brand>
        <div class="d-flex justify-content-center">
          <!--<p class="m-auto">{{ $route.name }}</p>-->
        </div>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse
          id="nav-collapse"
          class="ml-auto pr-3 align-content-center"
          is-nav
        >
          <b-navbar-nav class="ml-auto" right>
            <b-nav-item class="pr-3 p-2" to="/">Home</b-nav-item>
            <b-nav-item class="pr-3 p-2" to="/checkinout">Check In/Out</b-nav-item>
            <b-nav-item class="pr-3 p-2" to="/schedule">Schedule</b-nav-item>
            <b-nav-item class="pr-3 p-2" to="/meetings">Meetings</b-nav-item>
            <b-nav-item class="pr-3 p-2" to="/analytics">Analytics</b-nav-item>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <b-avatar
                  src="https://placekitten.com/300/300"
                  size="2rem"
                ></b-avatar>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
        </b-collapse>
      </b-navbar>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cabin:wght@500");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500");
#nav a.router-link-exact-active {
  color: white;
  border-bottom-style: solid;
  border-bottom-color: white;
}
.container-fluid {
  padding-right: 0px;
  padding-left: 0px;
}
#nav a {
  font-weight: 100;
  color: white;
}
.bg-info {
  background-color: white;
}
.navGroup {
  /*
  border-bottom-style: solid;
  border-bottom-color: #a6bfff;
  border-bottom-width: 0.25em;
  
  */
  margin-top: auto;
  margin-bottom: auto;
  background-color: #20368f;
}
.navbar {
}
p {
  font-size: 1.5em;
  font-family: "Roboto", Helvetica, Arial;
}

.navbar-expand-lg .navbar-nav {
  font-size: 1em;
  font-family: "Cabin", Helvetica, Arial;
}
li {
  margin-top: auto;
  margin-bottom: auto;
}

.navbar-dark .navbar-toggler-icon {
  fill: #a6bfff;
}
.navbar {
  padding: 0;
}
.navbar-brand {
  padding: 0;
}
.dropdown-toggle::after {
  color: white;
}
/deep/.navbar-light .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 255, 255, 3' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") ;
}
</style>
