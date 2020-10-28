<template>
  <b-container class="meetingspage">
    <h1>
      Create a Meeting
      <router-link to="/meetings" tag="button" class="btn ml-3" style="margin:0"
        >Back to meetings</router-link
      >
    </h1>
    <div class="Meetings">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>Date: </b-col>
          <b-col
            ><input type="date" id="meetingdate" name="meetingdate"
          /></b-col>
        </b-row>
        <b-row>
          <b-col> Start Time: </b-col>
          <b-col
            ><input type="time" id="meetingtime" name="meetingtime"
          /></b-col>
        </b-row>
        <b-row>
          <b-col> End Time: </b-col>
          <b-col
            ><input type="time" id="meetingendtime" name="meetingendtime"
          /></b-col>
        </b-row>
        <b-row>
          <b-col>Location: </b-col>
          <b-col><input type="text" id="location" name="location"/></b-col>
        </b-row>
        <b-row>
          <b-col>Select Employees Involved: </b-col>
          <b-col
            ><p class="test">
              <multiselect
                track-by="name"
                label="name"
                v-model="value"
                :options="employees"
                multiple
                >Employees Involved</multiselect
              >
            </p></b-col
          >
        </b-row>
      </b-container>
    </div>

    <b-button v-b-modal.modal-1>Launch demo modal</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
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
  font-family: "Josefin Sans", sans-serif !important;
  padding: 15px;
  font-size: 30px;
  text-align: center;
}
div {
  font-family: omnes-pro;
  text-align: left;
  padding: 15px;
}
/deep/.multiselect {
  width: 100px;
  border-color: black;
  font-size: 15px;
  width: 15vw;
}
/deep/.multiselect__tags {
  border: 1px solid black;
  padding: 0px 40px 0 5px;
  border-radius: 0px;
  background: #fff;
}
/deep/.multiselect,
/deep/.multiselect_input,
/deep/.multiselect_single {
  font-family: inherit;
  font-size: 15px;
  padding: 0;
}
/deep/.multiselect_single {
  width: 10px;
}
input {
  width: 15vw;
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
  margin: 0px;
}
</style>
