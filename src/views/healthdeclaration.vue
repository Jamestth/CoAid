<template>
  <div class="healthdeclaration">
    <table class = "center" style="text-align: center">
        <tr>
          <td> Health Declaration </td>
        </tr>
        <tr> 
          <td height = "125px"> </td>
          <td height = "125px"> </td>
        </tr>
        <tr>
            <td> 
              <form>
                <label for="temp"> Temperature (&#x2103;): </label>
                &nbsp;
                <input type="text" id="temp" name="temp"> <br> <br>
              </form>
            </td>
        </tr>
        <tr>
            <td> Are you currently serving any Quarantine Order, Stay-Home-Notice, <br>
            Leave of Absence or 5-day sick leave due to COVID-19 situation? <br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
              <label class="form-check-label" for="inlineRadio1"> Yes </label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
              <label class="form-check-label" for="inlineRadio2"> No </label>
            </div>
            </td>
        </tr>
        <tr>
            <td> Do you have pneunomia or respiratory symptomps (e.g. fever, cough, <br>
            runny nose, breathing problems etc.) or feel unwell? <br> 
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio1" value="option1">
              <label class="form-check-label" for="inlineRadio1"> Yes </label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="option2">
              <label class="form-check-label" for="inlineRadio2"> No </label>
            </div>
            </td>
        </tr>
        <tr>
            <td> Did you in the last 14 days, have contact with any case of COVID-19? <br>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio1" value="option1">
                <label class="form-check-label" for="inlineRadio1"> Yes </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio2" value="option2">
                <label class="form-check-label" for="inlineRadio2"> No </label>
              </div>
            </td>
        </tr>
        <tr>
            <td> <router-link to="/checkinsuccess" tag="button" class="btn ml-3" style="margin:0"> submit </router-link> </td>
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