<template>
  <div class="loginsignup">
    <table class="center" style="text-align: center">
      <tr>
        <td>
          <img src="../assets/LogoIcon.png" class="left" style="width:50%" />
        </td>
      </tr>
      <tr>
        <td>
          <router-link
            to="/login"
            tag="button"
            class="btn ml-3"
            style="margin:0"
          >
            Login
          </router-link>
        </td>
      </tr>
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
export default {
  data() {
    return {};
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