<template>
    <b-container class="meetingspage">
    <h1> SCHEDULE A MEETING </h1>
    <div class="Meetings">
      <b-row class="text-center">
        <b-col cols="6"> <!--change to adjust start point-->
          <h1>Meeting Details</h1>
          <b-container fluid>
      <b-row>
        <b-col
          ><label for="meetingdate"> Date: </label></b-col
        >
        <b-col
          ><input type="date" id="meetingdate" name="meetingdate" /></b-col
        >
      </b-row>
            <b-row>
        <b-col
          ><label for="meetingtime"> Start Time:</label></b-col
        >
        <b-col
          ><input type="time" id="meetingtime" name="meetingtime" /></b-col
        >
      </b-row>
            

            <label for="location"> Location:</label>
            <input type="text" id="location" name="location" /><br /><br /><br /><br />

            <label class="typo__label">Select Employees Involved:</label>
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
            <br />
            </b-container></b-col
        >

      <!-- <b-row class="text-center"> -->
        <b-col cols="6"> <!--change to adjust start point-->
          <h1>Meeting Agreement</h1>
          <b-container fluid>
            <br />
            <p class="para">By creating this meeting, I agree: <br><br>
              <ul>
              <li> To verify all participants are health status 'Healthy' for the past 14 days </li><br>
              <li> Meeting duration is not to exceed 60 minutes </li><br>
              <li> Participants must disinfect meeting location after use
              </li></ul>
              </p><br><br>


            <b-form-checkbox
              id="checkbox-1"
              v-model="status1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
            >
              I acknowledge to all of the above </b-form-checkbox
            ><br /><br />
            <b-button variant="outline-primary">Submit</b-button>
            
          </b-container></b-col
        >
      </b-row>
      </div>
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
        { name: "Ian (Tech)", value: "Ian (Tech)" },
      ],
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500");
h1 {
  font-family: 'Josefin Sans', sans-serif !important;
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
.multiselect, .multiselect_input, .multiselect_single {
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
  border-radius: 8px

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
.para {
  
}

</style>
