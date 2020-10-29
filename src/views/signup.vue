<template>
  <div class="signup">
    <table class = "center" style="text-align: center">
      <tr> 
        <td height = "125px"> </td>
      </tr>
      <tr>
        <td>
        <form>
                <label for="mobileno"> Mobile Number: </label>
                &nbsp;
                <input type="text" id="mobileno" name="mobileno"> <br> <br>
        </form>
        </td>
      </tr>
      <tr>
        <td>
        <form>
                <label for="password"> Password: </label>
                &nbsp;
                <input type="text" id="password" name="password"> <br> <br>
        </form>
        </td>
      </tr>
      <tr>
        <td>
        <form>
                <label for="password2"> Confirm Password: </label>
                &nbsp;
                <input type="text" id="password2" name="password2"> <br> <br>
        </form>
        </td>
      </tr>
      <tr>
        <td>
        <form>
                <label for="orgcode"> Organisation Code: </label>
                &nbsp;
                <input type="text" id="orgcode" name="orgcode"> <br> <br>
        </form>
        </td>
      </tr>
      <tr>
        <td>
        <form>
                <label for="dept"> Department: </label>
                &nbsp;
                <input type="text" id="dept" name="dept"> <br> <br>
        </form>
        </td>
      </tr>
      <tr>
        <td>
        <form>
                <label for="rot"> Rotation Team: </label>
                &nbsp;
                <input type="text" id="rot" name="rot"> <br> <br>
        </form>
        </td>
      </tr>
      <tr>
        <td> <button type='submit'> Submit </button> </td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from '../assets/firebase.js';
//this.form.email, this.form.password
export default {
  data() {
    return {
    };
  },
  methods: {
    submit(){
      firebase.auth().createUserWithEmailAndPassword("geo@yahoo.com", "123").catch(function(error){
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