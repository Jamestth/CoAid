<template>
    <b-container fluid>
    <h1>
      Create a new Roster
    </h1>
      <b-form>
        <b-row>
          <b-col></b-col>
          <b-col cols="3" class="pt-5">
            <b-form-group
              label-cols-sm="4"
              label-cols-md="3"
              id="input-group-2"
              label="Name: "
              label-for="input-2"
              label-align="left"
            >
              <b-form-input
                id="input-1"
                type="text"
                placeholder="Enter your name"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col> </b-col>
          <b-col cols="3">
            <b-form-group
              label-cols-sm="4"
              label-cols-md="3"
              id="input-group-2"
              label="Schedule: "
              label-for="input-2"
              label-align="left"
            >
              <b-form-radio-group
                id="input-2"
                v-model="selected"
                :options = "options"
                class = "mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                size = "lg"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row>
          <b-col> </b-col>
          <b-col cols="3">
            <b-form-group
              label-cols-sm="4"
              label-cols-md="3"
              id="input-group-3"
              label="Start Date:"
              label-for="input-2"
              label-align="left"
            >
              <b-form-input
                id="input-3"
                type="date"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row>
          <b-col> </b-col>
          <b-col cols="3">
            <b-form-group
              label-cols-sm="4"
              label-cols-md="3"
              id="input-group-4"
              label="End Date:"
              label-for="input-2"
              label-align="left"
            >
              <b-form-input
                id="input-4"
                type="date"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row>
          <b-col> </b-col>
          <b-col cols="3">
            <b-form-group
              label-cols-sm="4"
              label-cols-md="3"
              id="input-group-5"
              label="Team Member: "
              label-for="input-5"
              label-align="left"
            >
              <b-col
            >
              <multiselect
                select-label=""
                :show-labels="false"
                :limit="4"
                track-by="name"
                label="name"
                v-model="selectedEmp"
                :options="employees"
                :close-on-select="false"
                multiple
                ></multiselect
              ></b-col
          >
            </b-form-group>
          </b-col>
          <b-col> </b-col>
        </b-row>
         <b-row class="justify-content-md-center">
          <router-link
            to="/setroster"
            tag="button"
            class="btn ml-3"
            style="margin:0"
            @click.native="signin"
          >
            Set Roster
          </router-link>
        </b-row>
      </b-form>
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
      selectedEmp: null,
      employees: [
        { name: "Andy (Marketing)", value: "Andy (Marketing)" },
        { name: "Bobby (Marketing)", value: "Bobby (Marketing)" },
        { name: "Daisy (HR)", value: "Daisy (HR)" },
        { name: "Georgia (Tech)", value: "Georgia (Tech)" },
        { name: "Ian (Tech)", value: "Ian (Tech)" }
      ],
      options: [
          { item: 'A', name: 'Odd' },
          { item: 'B', name: 'Even' }
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