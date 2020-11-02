<template>
  <b-container class="meetingspage">
    <h1>
      My Meetings
      <router-link
        to="/createmeeting"
        tag="button"
        class="btn ml-3"
        style="margin:0"
        >Create meeting</router-link
      >
    </h1>
    <div class="Meetings">
      <b-row class="text-center">
        <b-table striped hover :items="items"></b-table>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import meetings from "../assets/Meeting.js";
import { DateTime } from "luxon";
export default {
  data() {
    return {
      meetings: meetings,
      userId: 1234,
      items: [],
    };
  },
  mounted() {
    //filter meetings to only relevant to the user
    let df = this.meetings.filter(
      (x) => x.employeeIds.filter((y) => y["eId"] == this.userId).length == 1
    );
    this.items = df.map((x) => {
      return {
        name: x.name,
        location: x.location,
        start: DateTime.fromMillis(x["start"]).toFormat(`ff`),
        end: DateTime.fromMillis(x["end"]).toFormat(`ff`),
        stats: x.employeeIds
          .filter((x) => x.eId == this.userId)
          .map((y) => y.status)[0],
      };
    });

    //this.meetings.filter(x => x.employeeIds.forEach( y => console.log(y["eId"] == this.userId) ));
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
  text-align: center;
  padding: 15px;
}
.multiselect {
  width: 300px;
  border-color: black;
  font-size: 15px;
}
.multiselect__tags {
  min-height: 40px;
  border: 1px solid #767676;
  display: block;
  padding: 0px 40px 0 5px;
  border-radius: 5px;
  background: #fff;
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
</style>
