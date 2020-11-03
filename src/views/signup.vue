<template>
  <div class="signup">
    <form @submit.prevent="submit">
      <table class="center" style="text-align: center">
        <tr>
          <td height="125px"></td>
        </tr>
        <tr>
          <td><label for="name"> Name: </label></td>
          <td>
            <input type="text" id="name" name="name" v-model="form.name" />
          </td>
        </tr>
        <tr>
          <td><label for="phone"> Phone Number: </label></td>
          <td>
            <input type="text" id="phone" name="phone" v-model="form.phone" />
          </td>
        </tr>
        <tr>
          <td><label for="email"> Email: </label></td>
          <td>
            <input type="text" id="email" name="email" v-model="form.email" />
          </td>
        </tr>
        <tr>
          <td><label for="password"> Password: </label></td>
          <td>
            <input
              type="text"
              id="password"
              name="password"
              v-model="form.password"
            />
          </td>
        </tr>
        <tr>
          <td><label for="password2"> Confirm Password: </label></td>
          <td><input type="text" id="password2" name="password2" /></td>
        </tr>
        <tr>
          <td><label for="orgcode"> Department: </label></td>
          <td>
            <input type="text" id="orgcode" name="orgcode" />
          </td>
        </tr>
        <tr>
          <td><label for="dept"> Unit code: </label></td>
          <td>
            <input type="text" id="unit" name="unit" v-model="form.unit" />
          </td>
        </tr>
        <tr>
          <button type="submit" onclick="submit">Submit</button>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import { auth, database } from "../assets/firebase.js";

export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
        password: "",
        unit: "",
        uid: ""
      }
    };
  },
  methods: {
    submit() {
      const name = this.form.name;
      const phone = this.form.phone;
      const email = this.form.email;
      const unit = this.form.unit;

      auth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(function(data) {
          database
            .collection("employees")
            .add({
              name: name,
              phone: phone,
              email: email,
              uid: data.user.uid,
              unit: unit,
              avatar: ""
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode);
          alert(errorMessage);
        });

      // database
      //   .collection("employees")
      //   .add({
      //     name: this.form.name,
      //     phone: this.form.phone,
      //     email: this.form.email,
      //     uid: myuid,
      //     unit: this.form.unit,
      //     avatar: ""
      //   })
      //   .then(function() {
      //     console.log("Document successfully written!");
      //   })
      //   .catch(function(error) {
      //     console.error("Error writing document: ", error);
      //   });
      console.log("Finally!");
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
