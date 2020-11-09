<template>
  <div class="analytics">
    <b-row class="text-center">
      <b-col>1 of 3</b-col>
      <b-col cols="8">2 of 3 (wider)</b-col>
      <b-col>3 of 3</b-col>
    </b-row>
  </div>
</template>
<script>
import { database } from "./../assets/firebase";
export default {
  data() {
    return {
      checkIn: [],
      employees: []
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      database
        .collection("checkIn")
        .get()
        .then(checkIns => {
          checkIns.forEach(checkIn => {
            this.checkIn.push(checkIn);
          });
        });

      database
        .collection("employees")
        .get()
        .then(emps => {
          emps.forEach(emp => {
            this.checkIn.push(emp);
          });
        });
    }
  }
};
</script>