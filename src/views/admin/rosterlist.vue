<template>
    <b-container fluid>
      <h1>
      Roster List
    </h1>
    <b-table hover :items="rosters"></b-table>
    </b-container>
</template>

<script>
//import Multiselect from "vue-multiselect";
export default {
  components: {  },
  data() {
    return {
      status1: "not_accepted",
      status2: "not_accepted",
      status3: "not_accepted",
      value: null,
      selectedEmp: null,
      rosters: [
        { name: "A", quantity: 3, startdate: "01/01/2001", enddate: "02/02/2002", schedule: "even"},
        { name: "B", quantity: 5, startdate: "01/01/2001", enddate: "02/02/2002", schedule: "odd"}
      ]
    };
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
h1 {
  /*font-family: "DM Sans", sans-serif !important; */
  padding: 15px;
  font-size: 30px;
  text-align: center;
}
div {
  text-align: left;
  padding: 0;
}
.app {
  background-color: #d3edf9;
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
td img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
/deep/.multiselect {
  width: 100px;
  border-color: #767676;
  font-size: 15px;
  width: 15vw;
}
/deep/.multiselect__tags {
  border: 1px solid #767676;
  padding: 0px 40px 0 5px;
  border-radius: px;
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
</style>