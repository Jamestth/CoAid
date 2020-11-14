<template>
  <b-container fluid>
    <h1>
      Roster List
      <b-button @click="newRoster">
        Create Roster
      </b-button>
    </h1>
    <b-row>
      <b-col></b-col>
      <b-col cols = "8">
    <b-table hover :items="rosters" :fields="fields" :key="rosters"></b-table>
      </b-col>
     <b-col></b-col>
    </b-row>
    <b-modal ref="modal" title="Create a new Roster">
      <h1>
        Create a new Roster
      </h1>
      <b-form>
        <b-row>
          <b-col />
          <b-col cols="10" class="pt-5">
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
          <b-col />
        </b-row>
        <b-row>
          <b-col />
          <b-col cols="10">
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
                v-model="form.schedule"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col />
        </b-row>
        <b-row>
          <b-col />
          <b-col cols="10">
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
          <b-col />
        </b-row>
        <b-row>
          <b-col />
          <b-col cols="10">
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
          <b-col />
        </b-row>
        <b-row>
          <b-col />
          <b-col cols="10">
            <b-form-group
              label-cols-sm="4"
              label-cols-md="3"
              id="input-group-5"
              label="Team Member: "
              label-for="input-5"
              label-align="left"
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
              ></multiselect>
            </b-form-group>
          </b-col>
          <b-col />
        </b-row>
      </b-form>

      <template #modal-footer>
        <div class="w-100">
          <b-button class="cusbtn" style="float:right" @click="submit"
            >Submit</b-button
          >
        </div>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { database } from "../../assets/firebase.js";
import { DateTime } from "luxon";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      rosters: [],
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true
        },
        {
          key: "schedule",
          label: "Schedule",
          sortable: true
        },
        {
          key: "nEmployees",
          label: "Number of Employees",
          sortable: true
        },
        {
          key: "startDate",
          label: "Start Date",
          sortable: true
        },

        {
          key: "endDate",
          label: "End Date",
          sortable: true,
          sortDirection: "desc"
        }
      ],
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
  methods: {
    fetchData: function() {
      this.rosters = [];
      database
        .collection("rosters")
        .get()
        .then(rosters => {
          rosters.forEach(roster => {
            var rosterData = roster.data();
            console.log(new Date(rosterData.startDate).getTime() / 1000);
            var s = new Date(rosterData.startDate);
            var e = new Date(rosterData.endDate);
            console.log(
              DateTime.fromSeconds(s.getTime() / 1000).toFormat("DD")
            );
            var rst = {
              name: rosterData.name,
              schedule: rosterData.schedule,
              nEmployees: rosterData.selectedEmp.length,
              startDate: DateTime.fromSeconds(s.getTime() / 1000).toFormat(
                "DD"
              ),
              endDate: DateTime.fromSeconds(e.getTime() / 1000).toFormat("DD")
            };
            this.rosters.push(rst);
          });
        });
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
    newRoster() {
      this.$refs["modal"].show();
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
          this.$router.push({ path: "/rosterlist" }).catch(error => error);
          this.$refs["modal"].hide();
          this.fetchData();
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  },
  created() {
    this.fetchData();
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

/deep/ .p[data-v-fae5bece] {
  padding: 5px;
}
/deep/ .table th {
  color: #fff;
  background-color: darkblue !important;
}
</style>