<template>
  <div class="schedule">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <h2>Here's your schedule, James</h2>
        <br />
        <h1>You are in {{this.name}}</h1>
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-row>
      <b-col></b-col>
      <b-col cols="4">
        Calendar
        <Calendar color="blue" :attributes="attrs" is-expanded />
      </b-col>
      <b-col cols="4">
        <table>
          <tr>
            <th>Team A</th>
            <th>Team B</th>
          </tr>
          <tr>
            <th>Andy</th>
            <th>Charlie</th>
          </tr>
          <tr>
            <th>Bobby</th>
            <th>Fanny</th>
          </tr>
          <tr>
            <th>Daisy</th>
            <th>Elaine</th>
          </tr>
          <tr>
            <th>Georgia</th>
            <th>Hilary</th>
          </tr>
          <tr>
            <th>Ian</th>
            <th></th>
          </tr>
        </table>
      </b-col>

      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import Calendar from "v-calendar/lib/components/calendar.umd";
import { auth, database } from "../assets/firebase";
//import DatePicker from 'v-calendar/lib/components/date-picker.umd'

// Or just use in separate component
export default {
  components: {
    Calendar //,
    //DatePicker
  },
  data() {
    return {
      attrs: [],
      name: "",

    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    fetchdata() {
      //get empId
      let userId = auth.currentUser.uid;
      let empId = auth.currentUser.uid;
      database
        .collection("employees")
        .get()
        .then(emps =>
          emps.forEach(emp => {
            if (emp.data().uid == userId) {
              empId = emp.id;
            }
          })
        );
        
      database
        .collection("rosters")
        .get()
        .then(rosters =>{
          rosters.forEach(roster => {
            let emps = roster.data().selectedEmp;
            if(emps.map(x => x.eid).includes(empId)){
              console.log(roster.data().startDate);
              this.name = roster.data().name;
              let attr = {
                highlight: "blue",
                dates: {
                  start: new Date(roster.data().startDate),
                  end: new Date(roster.data().endDate),
                  weekdays: [2, 3, 4, 5, 6],
                  weeklyInterval: 2
                }
              };
              this.attrs.push(attr); 
            }
          });
        }
        );
    }
  }
};
</script>