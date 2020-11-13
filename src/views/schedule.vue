<template>
  <div class="schedule">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <br />
        <h2>Here's your schedule, {{ this.userInfo.data().name }}</h2>
        <br />
        <h1 v-if="this.name != ''">
          You are in Roster: <b>{{ this.name }}</b>
        </h1>
        <h1 v-else>You are not in any roster</h1>
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-row>
      <b-col cols="1"></b-col>
      <b-col cols="3">
        <h3>Calendar</h3>
        <Calendar color="blue" :attributes="attrs" is-expanded is-light />
      </b-col>

      <b-col cols="3">
        <h3>Your Roster</h3>
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
      <b-col cols="3">
        <h2>Other Rosters</h2>
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

// Or just use in separate component
export default {
  components: {
    Calendar,
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
      activeRoster: "",
    };
  },
  watch: {
    activeRoster: function () {
      this.updateEmp();
    },
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
        .then((emps) =>
          emps.forEach((emp) => {
            if (emp.data().uid == userId) {
              this.userInfo = emp;
            }
          })
        );

      database
        .collection("rosters")
        .get()
        .then((rosters) => {
          rosters.forEach((roster) => {
            let rst = {
              value: roster.id,
              text: roster.data().name,
            };
            this.rosters.push(rst);
            let emps = roster.data().selectedEmp;

            if (emps.map((x) => x.id).includes(this.userInfo.id)) {
              this.name = roster.data().name;
              emps.forEach((x) => {
                x.get().then((x) => {
                  this.employees.push(x.data().name);
                });
              });
              let attr = {
                highlight: "blue",
                dates: {
                  start: new Date(roster.data().startDate),
                  end: new Date(roster.data().endDate),
                  weekdays: [2, 3, 4, 5, 6],
                  weeklyInterval: 2,
                },
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
        .then((rosters) => {
          rosters.forEach((roster) => {
            if (roster.id == this.activeRoster) {
              let emps = roster.data().selectedEmp;
              emps.forEach((x) => {
                x.get().then((x) => {
                  if (!this.otherEmployees.includes(x.data().name)) {
                    this.otherEmployees.push(x.data().name);
                  }
                });
              });
            }
          });
        });
    },
  },
};
</script>