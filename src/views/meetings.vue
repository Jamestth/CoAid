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
export default {
  data() {
    return {
      items: [
        {
          "Date DDMMYY": "25/11/20",
          time: "14:00",
          "Meeting Subject": "Marketing & Product Launch Meeting",
          status: "ACCEPTED",
        },
        {
          "Date DDMMYY": "4/12/20",
          time: "10:00",
          "Meeting Subject": "Employee Appraisal",
          status: "ACCEPTED",
        },
        {
          "Date DDMMYY": "7/01/21",
          time: "15:00",
          "Meeting Subject": "Project Aspire Stage 2",
          status: "PENDING",
        },
        {
          "Date DDMMYY": "01/10/20",
          time: "9:30",
          "Meeting Subject": "Board of Directors Meeting",
          status: "PAST",
        },
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
