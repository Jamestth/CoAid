<template>
  <div class="loginsignup">
    <table class = "center" style="text-align: center">
        <tr>
            <td> <img src = "../assets/LogoIcon.png" class = "left" style = "width:50%"> </td>
        </tr>
        <tr>
            <td> <button type="button"> Login </button> </td>
        </tr>
        <tr>
            <td> <button type="button"> Signup </button> </td>
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