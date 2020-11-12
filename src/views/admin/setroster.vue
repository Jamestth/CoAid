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
              v-model="form.name"
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
              :options="options"
              class="mb-3"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              size="lg"
              v-model="form.schedule"
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
              v-model="form.startDate"
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
              v-model="form.endDate"
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
            <b-col>
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
            ></b-col>
          </b-form-group>
        </b-col>
        <b-col> </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <router-link
          to="#"
          tag="button"
          class="btn ml-3"
          style="margin:0"
          @click.native="submit"
        >
          Set Roster
        </router-link>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import Multiselect from "vue-multiselect";
import { database } from "../../assets/firebase";

export default {
  components: { Multiselect },
  data() {
    return {
      status1: "not_accepted",
      status2: "not_accepted",
      status3: "not_accepted",
      form: {
        name: "",
        schedule: "",
        startDate: "",
        endDate: ""
      },
      value: null,
      selectedEmp: null,
      employees: [],
      options: [
        { item: "ODD", name: "Odd" },
        { item: "EVEN", name: "Even" }
      ]
    };
  },
  created() {
    this.fetchdata();
  },

  methods: {
    fetchdata() {
      database
        .collection("employees")
        .get()
        .then(emps =>
          emps.forEach(emp => {
            let empRecord = {
              name: emp.data().name,
              eid: emp.id,
              ref: database.doc("/employees/" + emp.id)
            };
            this.employees.push(empRecord);
          })
        );
    },
    submit() {
      console.log("This is called");
      const name = this.form.name;
      const schedule = this.form.schedule;
      const startDate = this.form.startDate;
      const endDate = this.form.endDate;
      const selectedEmp = this.selectedEmp;
      database
        .collection("rosters")
        .add({
          name: name,
          schedule: schedule,
          startDate: startDate,
          endDate: endDate,
          selectedEmp: selectedEmp.map(x => x.ref)
        })
        .then(x => {
          x;
          console.log("Document successfully written!");
          this.$router.push({ path: "/" }).catch(error => error);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
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