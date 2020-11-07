<template>
  <div class="checkinsuccess">
    <table class="center" style="text-align: center">
      <tr>
        <td height="125px"></td>
        <td height="125px"></td>
      </tr>
      <tr>
        <td>
          <img src="../assets/checkin.jpg" class="left" style="width:15vw" />
        </td>
      </tr>
      <tr>
        <td>Your check in was successful.</td>
      </tr>
      <tr>
        <td>Have a nice day!</td>
      </tr>
      <tr>
        <td>
          <router-link to="/" tag="button" class="btn ml-3" style="margin:0">
            Home
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