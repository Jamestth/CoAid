<template>
  <div class="login">
    <table class = "center">
    <tr><td height = "15px"></td></tr>
    <tr><td align = "center"><img src = "../assets/logomainpage.png" style = "width:20%"></td></tr>
    <tr><td align = "center"><img src = "../assets/coaidname.png" style = "width:20%"></td></tr>
    </table>
    <b-container fluid>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> Email: </b-col>
          <b-col col lg="1"
            ><input type="email" id="email" name="email"
          /></b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> Password: </b-col>
          <b-col col lg="1"
            ><input type="password" id="password" name="password"
          /></b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col col lg="2">
            
          </b-col>
        </b-row>
      </b-container>
      <router-link
                  to="/"
                  tag="button"
                  class="btn ml-3"
                  style="margin:0"
                  @click.native="signin"
                >
                  Sign in
            </router-link>
      
    <table class="center" style="text-align: center">
      <tr> <!-- change to hyperlink instead of button when you click on "here"-->
        <i> Create an account <router-link
            to="/signup"
            style="margin:0"
          > here </router-link> </i>
      </tr>
      <tr>
      </tr>
    </table>
  </div>
</template>

<script>
import { auth } from "./../assets/firebase";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signin() {
      //let email = "geo@yahoo.com";
      //let password = "MatheusAaron09052000";
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          error;
        });

      auth.onAuthStateChanged(user => {
        user;
        this.$router.push({ path: "/" }).catch(error => error);
      });
    }
  }
};
</script>
<style scoped>

div {
  text-align: left;
  padding: 15px;
  background-color:#d3edf9;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.btn {
  background-color: darkblue;
  text-align: center;
  color: white;
  padding: 10px;
  border-color: white;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 8px;
}
.btn:hover {
  background-color: white;
  border-color: darkblue;
  color: darkblue;
}
td img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>
