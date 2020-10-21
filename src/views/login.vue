<template>
  <div class="checkoutsuccess">
    <table class = "center" style="text-align: center">
        <tr>
            <td> <img src = "../assets/checkout.jpg" class = "left" style = "width:50%"> </td>
        </tr>
        <tr>
            <td> Your check out was successful. </td>
        </tr>
        <tr>
            <td> Have a nice day! </td>
        </tr>
        <tr>
            <td> <button type="button"> Home </button> </td>
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