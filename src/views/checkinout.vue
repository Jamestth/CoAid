<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="8">
      <b-row>
        <b-col>
          <b-row class="d-flex justify-content-center">
            <img src="../assets/checkin.jpg" style="width:20vw" />
          </b-row>
          <b-row class="d-flex justify-content-center">
            <router-link
              to="/healthdeclaration"
              tag="button"
              class="btn ml-3"
              style="margin:0"
            >
              Check In
            </router-link>
          </b-row>
        </b-col>
        <b-col>
          <b-row class="d-flex justify-content-center">
            <img src="../assets/checkout.jpg" style="width:20vw" />
          </b-row>
          <b-row class="d-flex justify-content-center">
            <button
              tag="button"
              class="btn ml-3"
              style="margin:0"
              v-on:click="checkOut()"
            >
              CheckOut
            </button>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
import { firebase, auth, database } from "./../assets/firebase";
export default {
  data() {
    return {};
  },
  methods: {
    checkOut() {
      let userId = auth.currentUser.uid;
      database
        .collection("employees")
        .where("uid", "==", userId)
        .limit(1)
        .get()
        .then(emps =>
          emps.forEach(emp => {
            database
              .collection("checkIn")
              .where("employee", "==", emp.id)
              .get()
              .then(checkins =>
                checkins.forEach(checkin => {
                  let checkinid = checkin.id;
                  let curTime = firebase.firestore.FieldValue.serverTimestamp();
                  database
                    .collection("checkIn")
                    .doc(checkinid)
                    .update({
                      checkOut: curTime
                    })
                    .then(x => {
                      x;
                      this.$router
                        .push({ path: "/checkoutsuccess" })
                        .catch(error => error);
                    });
                })
              );
          })
        );
    }
  }
};
</script>

<style scoped>
div {
  text-align: left;
  padding: 15px;
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
</style>