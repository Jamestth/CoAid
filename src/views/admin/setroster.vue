<template>
    <b-container class="meetingspage">
    <h1> CREATE A ROSTER </h1>
    <div class="Roster">
      <b-row class="text-center">
        <b-col cols="12"> <!--change to adjust start point-->
          <h1>RosterDetails</h1>
          <b-container fluid>
      <b-row>
        <b-col
          ><label for="meetingdate"> Roster Name: </label></b-col
        >
        <b-col
          ><input type="text" id="meetingdate" name="meetingdate" /></b-col
        >
      </b-row>
      <b-row>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
<label for="vehicle1"> I have a bike</label><br>
<input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
<label for="vehicle2"> I have a car</label><br>
<input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
<label for="vehicle3"> I have a boat</label><br>
      </b-row>
            <b-row>
        <b-col
          ><label for="meetingtime"> Start Date:</label></b-col
        >
        <b-col
          ><input type="time" id="meetingtime" name="meetingtime" /></b-col
        >
      </b-row>
      <b-col
          ><label for="meetingtime"> EndDate:</label></b-col
        >
        <b-col
          ><input type="time" id="meetingtime" name="meetingtime" /></b-col
        >
      </b-row>
            <label class="typo__label">Select Employees:</label>
            <p class="test">
              <multiselect
                track-by="name"
                label="name"
                v-model="value"
                :options="employees"
                multiple
                >Employees Involved</multiselect
              >
              <!--ugly!-->
            </p>
            <br/>
            </b-container>    

</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  data() {
    return {
      status1: "not_accepted",
      status2: "not_accepted",
      status3: "not_accepted",
      value: null,
      employees: [
        { name: "Andy (Marketing)", value: "Andy (Marketing)" },
        { name: "Bobby (Marketing)", value: "Bobby (Marketing)" },
        { name: "Daisy (HR)", value: "Daisy (HR)" },
        { name: "Georgia (Tech)", value: "Georgia (Tech)" },
        { name: "Ian (Tech)", value: "Ian (Tech)" }
      ]
    };
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500");
h1 {
  font-family: "Josefin Sans", sans-serif !important;
  padding: 15px;
  font-size: 30px;
  text-align: center;
}
div {
  font-family: omnes-pro;
  text-align: center;
  padding: 15px;
}
.multiselect {
  width: 300px;
  border-color: black;
  font-size: 15px;
}
.multiselect,
.multiselect_input,
.multiselect_single {
  font-family: inherit;
  font-size: 15px;
  padding: 15px;
  text-align: left;
  margin: auto;
}
.multiselect_single {
  width: 10px;
}
.btn {
  background-color: darkblue;
  text-align: center;
  color: white;
  padding: 10px;
  border-color: white;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
  width: 100px;
  border-radius: 8px;
}
.btn:hover {
  background-color: white;
  border-color: darkblue;
  color: darkblue;
}

label {
  margin: 10px;
}
.multiselect__tags {
  border-color: black;
}
</style>
