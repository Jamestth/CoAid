<template>
  <div class="healthdeclaration">
    <table class="center" style="text-align: center">
      <tr>
        <td><h1 class="pt-5 pb-5">Health Declaration</h1></td>
      </tr>
      <tr>
        <td>
          <form>
            <label for="temp"> Temperature (&#x2103;): </label>
            &nbsp;

            <input
              type="number"
              id="temp"
              name="temp"
              min="35"
              max="42"
              step="0.1"
              v-model="temperature"
              required
            />
            <b-row style="padding:0">
              <b-col></b-col>
              <b-col cols="4">
                <b-form-input
                  v-model="temperature"
                  type="range"
                  min="35"
                  max="42"
                  step="0.1"
                  variant="warning"
                ></b-form-input
              ></b-col>
              <b-col></b-col>
            </b-row>
          </form>
        </td>
      </tr>
      <tr>
        <td>
          Are you currently serving any Quarantine Order, Stay-Home-Notice,
          <br />
          Leave of Absence or 5-day sick leave due to COVID-19 situation? <br />
          <div class="d-flex justify-content-center">
            <b-form-group>
              <b-form-radio-group style="padding:0" v-model="shnFlag">
                <b-form-radio
                  style="padding-top:0; padding-bottom:0"
                  :value="true"
                  >Yes</b-form-radio
                >
                <b-form-radio
                  style="padding-top:0; padding-bottom:0"
                  :value="false"
                  >No</b-form-radio
                >
              </b-form-radio-group>
            </b-form-group>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          Do you have pneunomia or respiratory symptomps (e.g. fever, cough,
          <br />
          runny nose, breathing problems etc.) or feel unwell? <br />
          <div class="d-flex justify-content-center">
            <b-form-group>
              <b-form-radio-group style="padding:0" v-model="fluFlag">
                <b-form-radio
                  style="padding-top:0; padding-bottom:0"
                  :value="true"
                  >Yes</b-form-radio
                >
                <b-form-radio
                  style="padding-top:0; padding-bottom:0"
                  :value="false"
                  >No</b-form-radio
                >
              </b-form-radio-group>
            </b-form-group>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          Did you in the last 14 days, have contact with any case of COVID-19?
          <br />
          <div class="d-flex justify-content-center">
            <b-form-group>
              <b-form-radio-group style="padding:0" v-model="contactFlag">
                <b-form-radio
                  style="padding-top:0; padding-bottom:0"
                  :value="true"
                  >Yes</b-form-radio
                >
                <b-form-radio
                  style="padding-top:0; padding-bottom:0"
                  :value="false"
                  >No</b-form-radio
                >
              </b-form-radio-group>
            </b-form-group>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="d-flex justify-content-center">
            <button
              tag="button"
              class="btn ml-3"
              style="margin:0"
              v-on:click="submit()"
            >
              submit
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { firebase, auth, database } from "./../assets/firebase";
import { DateTime } from "luxon";
export default {
  data() {
    return {
      temperature: null,
      fluFlag: null,
      shnFlag: null,
      contactFlag: null
    };
  },
  created() {},

  methods: {
    submit() {
      let userId = auth.currentUser.uid;
      DateTime;
      auth;
      database
        .collection("employees")
        .where("uid", "==", userId)
        .limit(1)
        .get()
        .then(emps =>
          emps.forEach(emp => {
            let curTime = firebase.firestore.FieldValue.serverTimestamp();
            let data = {
              checkIn: curTime,
              contactFlag: this.contactFlag,
              employee: emp.id,
              fluFlag: this.fluFlag,
              shnFlag: this.shnFlag,
              temperature: parseFloat(this.temperature)
            };
            if (
              data.checkIn == null ||
              data.contactFlag == null ||
              data.employee == null ||
              data.fluFlag == null ||
              data.shnFlag == null ||
              this.temperature == null
            ) {
              alert("Please fill in all the fields before submiting");
            } else if (this.temperature > 42 || this.temperature < 35) {
              alert("Please enter a temperature between 35 and 42 degrees");
            } else {
              database
                .collection("checkIn")
                .add(data)
                .then(
                  this.$router
                    .push({ path: "/checkinsuccess" })
                    .catch(error => error)
                );
            }
          })
        );
    }
  }
};
</script>

<style scoped>
.custom-control-inline {
  display: inline-flex;
  margin-right: 0rem;
  margin-left: 2rem;
}
div {
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