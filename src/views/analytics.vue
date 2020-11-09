<template>
  <div class="analytics">
    <b-row style="height:3vh"></b-row>
    <b-row>
      <b-col cols="1"></b-col>
      <b-col>
        <b-card class="mt-3">
          <div class="test">
            <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart></div
        ></b-card>
      </b-col>
      <b-col>
        <b-card class="mt-3">
          <div class="test">
            <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart></div
        ></b-card>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
    <b-row>
      <b-col cols="1"></b-col>
      <b-col>
        <b-card class="mt-3">
          <div class="test">
            <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart></div
        ></b-card>
      </b-col>
      <b-col>
        <b-card class="mt-3">
          <div class="test">
            <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart></div
        ></b-card>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
  </div>
</template>
<script>
import { database } from "./../assets/firebase";
import Barchart from "./../components/StatusBar.vue";
export default {
  components: { Barchart },
  data() {
    return {
      checkIn: [],
      employees: [],
      meetings: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      database
        .collection("meetings")
        .get()
        .then(meetings =>
          meetings.forEach(meeting => {
            let meetingRecord = meeting.data();
            this.meetings.push(meetingRecord);
            meetingRecord.employeesids = [];
            meetingRecord.acceptedids = [];

            meeting.data().employees.forEach(emp => {
              meetingRecord.employeesids.push(emp.id);
            });

            meeting.data().accepted.forEach(emp => {
              meetingRecord.acceptedids.push(emp.id);
            });
          })
        );
      database
        .collection("checkIn")
        .get()
        .then(checkIns => {
          checkIns.forEach(checkIn => {
            let checkInRecord = checkIn.data();
            checkInRecord.id = checkIn.id;
            this.checkIn.push(checkInRecord);
          });
        });

      database
        .collection("employees")
        .get()
        .then(emps => {
          console.log("hi");
          emps.forEach(emp => {
            let empRecord = emp.data();
            empRecord.id = emp.id;
            empRecord.unit.get().then(unit => {
              empRecord.unitname = unit.data().name;
              empRecord.unitid = unit.id;
              unit
                .data()
                .location.get()
                .then(loc => {
                  empRecord.unitLocation = loc.data().name;
                  empRecord.unitLocationid = loc.id;
                });
              unit
                .data()
                .department.get()
                .then(dept => {
                  empRecord.department = dept.data().name;
                  empRecord.departmentid = dept.id;
                });
            });
            this.employees.push(empRecord);
          });
        });
    }
  }
};
</script>
<style scoped>
.test {
  height: 100% !important;
  width: 100% !important;
  position: relative;
}
.card {
}
.card-body {
  height: 40vh;
  width: 20vw;
  padding: 0;
  position: relative;
}
</style>