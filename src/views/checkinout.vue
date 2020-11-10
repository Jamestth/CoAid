<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="4" class="d-flex justify-content-center">
      <b-row>
        <div v-if="!checkedIn()">
          <b-col>
            <b-row class="d-flex justify-content-center">
              <img src="../assets/checkin.jpg" style="width:15vw" />
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
        </div>
        <div v-if="checkedIn()">
          <b-col>
            <b-row class="d-flex justify-content-center">
              <img src="../assets/checkout.jpg" style="width:15vw" />
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
        </div>
      </b-row>
    </b-col>

    <b-col></b-col>
  </b-row>
</template>

<script>
import { firebase, auth, database } from "./../assets/firebase";
export default {
  data() {
    return {
      lastCheck: null,
      empId: null
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    checkedIn() {
      if (!this.lastCheck) {
        return false;
      } else {
        if (this.lastCheck.checkIn) {
          if (this.lastCheck.checkOut) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    },
    fetchData() {
      database
        .collection("employees")
        .where("uid", "==", auth.currentUser.uid)
        .get()
        .then(snap =>
          snap.forEach(y => {
            this.empId = y.id;
            database
              .collection("checkIn")
              .where("employee", "==", this.empId)
              .orderBy("checkIn", "desc")
              .limit(1)
              .get()
              .then(snap => {
                snap.forEach(checkInRecord => {
                  this.lastCheck = {
                    checkIn: checkInRecord.data().checkIn,
                    checkOut: checkInRecord.data().checkOut
                  };
                });
              });
          })
        );
    },

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