<template>
  <div class="login">
    <table class = "center" style="text-align: center">
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
        <td> <router-link to="/healthdeclaration" tag="button" class="btn ml-3" style="margin:0"> Submit </router-link> </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
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
</style>