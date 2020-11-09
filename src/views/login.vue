<template>
  <div class="login">
    <table class="center">
      <tr>
        <td height="15px"></td>
      </tr>
      <tr>
        <td align="center">
          <img src="../assets/logomainpage.png" style="width:20%" />
        </td>
      </tr>
      <tr>
        <td align="center">
          <img src="../assets/coaidname.png" style="width:20%" />
        </td>
      </tr>
    </table>

    <b-container fluid>
      <b-form>
        <b-row>
          <b-col></b-col>
          <b-col class="pt-5">
            <b-form-group
              label-cols-sm="5"
              label-cols-md="4"
              id="input-group-2"
              label="Email:"
              label-for="input-2"
              label-align="left"
            >
              <b-form-input
                id="input-2"
                type="email"
                v-model="email"
                placeholder="Enter a email"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col> </b-col>
          <b-col>
            <b-form-group
              label-cols-sm="5"
              label-cols-md="4"
              id="input-group-2"
              label="Password:"
              label-for="input-2"
              label-align="left"
            >
              <b-form-input
                id="input-3"
                type="password"
                v-model="password"
                placeholder="Enter Password"
                v-on:keyup.enter="signin"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row class="d-flex justify-content-center">
          <router-link
            to="/"
            tag="button"
            class="btn ml-3"
            style="margin:0"
            @click.native="signin"
          >
            Sign in
          </router-link>
        </b-row>
      </b-form>
    </b-container>

    <table class="center" style="text-align: center">
      <tr>
        <!-- change to hyperlink instead of button when you click on "here"-->
        <i>
          Create an account
          <router-link to="/signup" style="margin:0"> here </router-link>
        </i>
      </tr>
      <tr></tr>
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
      if (this.email && this.password) {
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(function(error) {
            error;
            alert("The Email/Password is not correct. Please try again.");
          });

        auth.onAuthStateChanged(user => {
          user;
          this.$router.push({ path: "/" }).catch(error => error);
        });
      } else {
        alert("Please enter your email and password.");
      }
    }
  }
};
</script>
<style scoped>
div {
  text-align: left;
  padding: 0;
}
.login {
  height: 100%;
  background-color: #d3edf9;
}

html,
body {
  height: 100%;
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
