<template>
  <div class="Meetings">
    <b-row class="text-center">
      <b-col></b-col>
      <b-col cols="8"> <!--change to adjust start point-->
        <h1>Meeting Details</h1>
        <b-container fluid>
          <label for="meetingICemail"> Meeting I/C Email:</label>
          <input
            type="email"
            id="meetingICemail"
            name="meetingICemail"
          /><br /><br />

          <label for="meetingdate"> Meeting Date:</label>
          <input type="date" id="meetingdate" name="meetingdate" /><br /><br />

          <label for="meetingtime"> Meeting Start Time:</label>
          <input type="time" id="meetingtime" name="meetingtime" /><br /><br />

          <label for="location"> Location:</label>
          <input type="text" id="location" name="location" /><br /><br />

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
          <h2>Meeting Agreement</h2>
          <br />
          <p>I acknowledge that:</p>

          <b-form-checkbox
            id="checkbox-1"
            v-model="status1"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            All employees' involved are health status 'Healthy' for the past 2
            weeks </b-form-checkbox
          ><br /><br />

          <b-form-checkbox
            id="checkbox-2"
            v-model="status2"
            name="checkbox-2"
            value="accepted"
            unchecked-value="not_accepted"
          >
            This meeting should not exceed the 1-hour duration </b-form-checkbox
          ><br /><br />

          <b-form-checkbox
            id="checkbox-3"
            v-model="status3"
            name="checkbox-3"
            value="accepted"
            unchecked-value="not_accepted"
          >
            This meeting should end promptly to allow time for disinfection </b-form-checkbox
          ><br /><br />

          <b-button variant="outline-primary">Submit</b-button>
        </b-container></b-col
      >
      <b-col></b-col>
    </b-row>
  </div>
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
h1 {
  padding: 15px;
  font-size: 30px;
}
div {
  text-align: left;
  padding: 15px;
}
.multiselect {
  width: 300px;
  border-color: black;
  font-size: 15px;
}
</style>
