<template>
  <div class="login">
    <table class = "center">
    <tr><td height = "15px"></td></tr>
    <tr><td align = "center"><img src = "../assets/LogoIcon2.png" style = "width:50%"></td></tr>
    </table>
    <table class="center" style="text-align: center">
      <tr>
          <td height="50px"></td>
      </tr>
      <tr>
        <td>
          <form>
            <label for="Email"> Email: </label>
            &nbsp;
            <input type="text" id="Email" name="Email" v-model="email" /> <br />
            <br />
          </form>
        </td>
      </tr>
      <tr>
        <td>
          <form>
            <label for="password"> Password: </label>
            &nbsp;
            <input
              type="text"
              id="password"
              name="password"
              v-model="password"
            />
            <br />
            <br />
          </form>
        </td>
      </tr>
      <tr>
        <td>
          <router-link
            to="/"
            tag="button"
            class="btn ml-3"
            style="margin:0"
            @click.native="signin"
          >
            Sign in
          </router-link>
        </td>
      </tr>
      <tr>
          <td height="15px"></td>
      </tr>
      <tr> Don't have an account? </tr>
      <tr>
        <td>
          <router-link
            to="/signup"
            tag="button"
            class="btn ml-3"
            style="margin:0"
          >
            Signup
          </router-link>
        </td>
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
td img{
    display: block;
    margin-left: auto;
    margin-right: auto;

}
</style>
