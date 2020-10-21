<template>
  <div class="checkinout">
    <table class = "center" style="text-align: center">
      <tr> 
        <td height = "125px"> </td>
        <td height = "125px"> </td>
      </tr>
      <tr>
        <td>
          <img src = "../assets/checkin.jpg" class = "left" style = "width:50%">
        </td>
        <td>
          <img src = "../assets/checkout.jpg" class = "right" style = "width:50%">
        </td>
      </tr>
      <tr>
        <td> <button type="button"> Check In </button> </td>
        <td> <button type="button"> Check Out </button> </td>
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