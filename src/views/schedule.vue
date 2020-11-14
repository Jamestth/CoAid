<template>
  <div class="schedule">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <br />
        <br />
        <h1 v-if="this.name != ''">
          You are in <b>{{ this.name }}</b>
        </h1>
        <h1 v-else>You are not in any roster</h1>
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-row>
      <b-col cols="1"></b-col>
      <b-col cols="3"><br><br><br><br>
        <h3>Schedule</h3>
        <Calendar color="blue" :attributes="attrs" is-expanded is-light />
      </b-col>

      <b-col cols="3"><br>
        <h3>Employees in {{ this.name }}</h3>
        <br />
        <b-list-group>
          <b-list-group-item
            variant="dark"
            v-for="employee in employees"
            :name="employee"
            :key="employee"
          >
            {{ employee }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="3"><br>
        <h3>Other Rosters</h3>
        <b-form-select
          v-model="activeRoster"
          @change.native="updateEmp"
          id="cluster"
          text="Select Cluster"
          variant="dark"
          class="m-2"
          :options="rosters"
        >
        </b-form-select>
        <b-list-group :key="activeRoster">
          <b-list-group-item
            variant="dark"
            v-for="employee in otherEmployees"
            :key="employee"
          >
            {{ employee }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col />
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col />
    </b-row>
  </div>
</template>

<script>
import Calendar from "v-calendar/lib/components/calendar.umd";
import { auth, database } from "../assets/firebase";
// import { DateTime } from "luxon";

// Or just use in separate component
export default {
  components: {
    Calendar
  },
  data() {
    return {
      attrs: [],
      name: "",
      userInfo: "",
      selectedEmp: [],
      employees: [],
      rosters: [],
      otherEmployees: [],
      activeRoster: ""
    };
  },
  watch: {
    activeRoster: function() {
      this.updateEmp();
    }
  },
  created() {
    this.fetchdata();
  },
  methods: {
    fetchdata() {
      //get empId
      let userId = auth.currentUser.uid;
      database
        .collection("employees")
        .get()
        .then(emps =>
          emps.forEach(emp => {
            if (emp.data().uid == userId) {
              this.userInfo = emp;
            }
          })
        );

      database
        .collection("rosters")
        .get()
        .then(rosters => {
          rosters.forEach(roster => {
            let rst = {
              value: roster.id,
              text: roster.data().name
            };
            this.rosters.push(rst);
            let emps = roster.data().selectedEmp;

            if (emps.map(x => x.id).includes(this.userInfo.id)) {
              this.name = roster.data().name;
              emps.forEach(x => {
                x.get().then(x => {
                  this.employees.push(x.data().name);
                });
              });
              // let today = DateTime.fromISO(DateTime.local().toISODate());

              // Copy date so don't modify original
              // let d = new Date(Date.UTC(today.year, today.month, today.day));
              let d = new Date(roster.data().startDate);
              console.log(d);
              // Set to nearest Thursday: current date + 4 - current day number
              // Make Sunday's day number 7
              d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
              // Get first day of year
              var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
              // Calculate full weeks to nearest Thursday
              var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
              // Return array of year and week number
              console.log(d);
              console.log(weekNo);   

              var sd = new Date(roster.data().startDate);
              if(roster.data().schedule == "ODD"){
                if(weekNo%2==0){
                  sd.setUTCDate(d.getUTCDate() + 7 - d.getUTCDay());
                }
              }
              else{
                if(weekNo%2==1){
                  sd.setUTCDate(d.getUTCDate() + 7 - d.getUTCDay());
                }
              }
              console.log(sd);

              let attr = {
                highlight: "blue",
                dates: {
                  start: sd,
                  end: new Date(roster.data().endDate),
                  weekdays: [2, 3, 4, 5, 6],
                  weeklyInterval: 2
                }
              };
              this.selectedEmp.push(this.userInfo);
              this.attrs.push(attr);
            }
          });
        });
    },
    updateEmp() {
      //console.log(this.otherEmployees);

      this.otherEmployees = [];
      database
        .collection("rosters")
        .get()
        .then(rosters => {
          rosters.forEach(roster => {
            if (roster.id == this.activeRoster) {
              let emps = roster.data().selectedEmp;
              emps.forEach(x => {
                x.get().then(x => {
                  if (!this.otherEmployees.includes(x.data().name)) {
                    this.otherEmployees.push(x.data().name);
                  }
                });
              });
            }
          });
        });
    }
  }
};
</script>

@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@500");

<style scoped>
h1 {
  font-family: "DM Sans", sans-serif !important;
  padding: 15px;
  font-size: 30px;
  text-align: center;
}
/deep/.list-group-item-dark {
  background-color: #ffffff;
}

</style>