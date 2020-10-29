<template>
  <div class="signup">
    <form @submit.prevent="submit">
      <table class="center" style="text-align: center">
        <tr>
          <td height="125px"></td>
        </tr>
        <tr>
          <td><label for="email"> Email: </label></td>
          <td><input type="text" id="email" name="email" /></td>
        </tr>
        <tr>
          <td><label for="password"> Password: </label></td>
          <td><input type="text" id="password" name="password" /></td>
        </tr>
        <tr>
          <td><label for="password2"> Confirm Password: </label></td>
          <td><input type="text" id="password2" name="password2" /></td>
        </tr>
        <tr>
          <td><label for="orgcode"> Organisation Code: </label></td>
          <td><input type="text" id="orgcode" name="orgcode" /></td>
        </tr>
        <tr>
          <td><label for="dept"> Department: </label></td>
          <td><input type="text" id="dept" name="dept" /></td>
        </tr>
        <tr>
          <td><label for="rot"> Rotation Team: </label></td>
          <td><input type="text" id="rot" name="rot" /></td>
        </tr>
        <tr>
          <button type="submit" onclick="submit">Submit</button>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import { auth } from "../assets/firebase.js";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        orgCode: "",
        dept: "",
        team: ""
      }
    };
  },
  methods: {
    submit() {
      console.log('hi');
      auth
        .createUserWithEmailAndPassword("geo@yahoo.com", "MatheusAaron09052000")
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode);
          alert(errorMessage);
          
        });
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
</style>