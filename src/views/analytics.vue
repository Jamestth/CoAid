<template>
  <div class="analytics pt-5">
    <div class="charts">
      <div class="flexbox-item">
        <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart>
      </div>
      <div class="flexbox-item">
        <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart>
      </div>
      <div class="break"></div>
      <div class="flexbox-item">
        <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart>
      </div>
      <div class="flexbox-item">
        <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart>
      </div>
    </div>
    <div class="filters"></div>
    <!--<table>
      <tr>
        <td style="width:10vw"></td>
        <td style="width:70vw">
          <div style="padding-right:4vw; width:30vw; float:right">
            <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart>
          </div>
          <div style="padding-left:4vw; width:30vw; float:left">
            <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart>
          </div>
        </td>
        <td style="width:20vw; background-color:gray"></td>
      </tr>
      <tr>
        <td style="width:10vw"></td>
        <td style="width:70vw">
          <div style="padding-right:4vw; width:30vw; float:right">
            <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart>
          </div>
          <div style="padding-left:4vw; width:30vw; float:left">
            <Barchart v-if="checkIn[0]" :data="checkIn"></Barchart>
          </div>
        </td>
        <td style="width:20vw; background-color:gray"></td>
      </tr>
    </table>
    -->

    <!--
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
    </b-row> -->
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
}
.card {
}
.card-body {
}
.analytics {
  display: flex;
}
.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80vw;

}
.filters {
  width: 20vw;
}
.flexbox-item {
  width: 35vw;
  height: 40vh;
  border: 3px solid black;
  align-items: center;
}
.break {
  flex-basis: 100%;
  height: 0;
  padding:2.5vh
}
</style>