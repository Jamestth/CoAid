<template>
  <div class="schedule">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <h2>Here's your schedule, {{ this.userInfo.data().name }}</h2>
        <br />
        <h1>You are in {{ this.name }}</h1>
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-row>
      <b-col></b-col>
      <b-col cols="4">
        <h3> Calendar </h3>
        <Calendar color="blue" :attributes="attrs" is-expanded is-dark/>
      </b-col>

      <b-col cols="4">
        <h3> Roster Members </h3>
        <br />
        <b-list-group>
          <b-list-group-item variant="primary"
            v-for="employee in employees"
            :name="employee"
            :key="employee"
          >
            {{ employee }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>
        <b-dropdown id="dropdown-dropright" dropright text="Select Cluster" variant="primary" class="m-2">
          <b-dropdown-item href="#" v-for="cluster in clusters" :name = "cluster" :key="cluster"> {{cluster}} </b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Calendar from "v-calendar/lib/components/calendar.umd";
import { auth, database } from "../assets/firebase";

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
      clusters: ["A", "B", "C", "D"]
    };
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
            let emps = roster.data().selectedEmp;
            if (emps.map(x => x.id).includes(this.userInfo.id)) {
              this.name = roster.data().name;
              emps.forEach(x => {
                x.get().then(x => {
                  this.employees.push(x.data().name);
                });
              });
              let attr = {
                highlight: "blue",
                dates: {
                  start: new Date(roster.data().startDate),
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
    }
  }
};
</script>