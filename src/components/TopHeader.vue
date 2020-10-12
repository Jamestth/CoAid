<template>
<b-container fluid>
  <div class="navGroup">
    <b-navbar  toggleable="lg" type="light" variant="light">
      <b-navbar-brand class = "pl-3 ">
        <img src="../assets/LogoIcon.png" width="100" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="ml-auto pr-3 align-content-center" is-nav>
        <b-navbar-nav class="ml-auto" right>
          <b-nav-item class="p-3" to="/">Home</b-nav-item>
          <b-nav-item class="p-3" to="/checkinout">Check In/Out</b-nav-item>
          <b-nav-item class="p-3" to="/schedule">Schedule</b-nav-item>
          <b-nav-item class="p-3" to="/meetings">Meetings</b-nav-item>
          <b-nav-item class="p-3" to="/analytics">Analytics</b-nav-item>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <img src="../assets/User.png" width="60" height="60" />
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
export default {};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Cabin:wght@500");
#nav a.router-link-exact-active {
  color: black;
  border-bottom-style: solid;
  border-bottom-color: #a6bfff;
}
.container-fluid {
    padding-right: 0px;
    padding-left: 0px;

}
#nav a {
  font-weight: 100;
}
.bg-info {
  background-color: white;
}
.navGroup {
  border-bottom-style: solid;
  border-bottom-color: #a6bfff;
  border-bottom-width: 0.25em;
  margin-bottom: 20px;
}

.navbar-expand-lg .navbar-nav {
  font-size: 1.5em;
  font-family: "Cabin", Helvetica, Arial;
}
li {
  margin-top: auto;
  margin-bottom: auto;
}

.navbar-dark .navbar-toggler-icon {
  fill: #a6bfff;
}
</style>
