<template>
  <div class="signup">
    <b-row>
      <b-col></b-col>
      <b-col cols="3">
        <b-row>
          <table class="center pb-5">
            <tr>
              <td height="15px"></td>
            </tr>
            <tr>
              <td class="d-flex justify-content-center">
                <img src="../assets/logomainpage.png" style="width:20vh" />
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:1vh">
                <img src="../assets/coaidname.png" style="width:20vh" />
              </td>
            </tr>
          </table>
        </b-row>
        <b-row> </b-row>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-form class="pt-5" @submit.prevent="submit">
      <b-row>
        <b-col></b-col>
        <b-col xs= "10" md="3">
          <b-form-group label-cols="4" label="Name:" label-align="left">
            <b-form-input
              v-model="form.name"
              required
              placeholder="Enter a name"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="3">
          <b-form-group label-cols="4" label="Contact:" label-align="left">
            <b-form-input
              v-model="form.phone"
              pattern="[0-9]{8}"
              type="tel"
              required
              placeholder="Enter a Contact No."
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="3">
          <b-form-group label-cols="4" label="Email:" label-align="left">
            <b-form-input
              v-model="form.email"
              type="email"
              pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
              required
              placeholder="Enter an email"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="3">
          <b-form-group label-cols="4" label="Password:" label-align="left">
            <b-form-input
              v-model="form.password"
              type="password"
              required
              placeholder="Enter a Password"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="3">
          <b-form-group label-cols="4" label="Confirm:" label-align="left">
            <b-form-input
              v-model="form.password2"
              type="password"
              required
              placeholder="Re-enter the Password"
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="3">
          <b-form-group label-cols="4" label="Department:" label-align="left">
            <b-form-select
              v-model="curSelectedDept"
              :options="this.departmentOptions"
              required
              :v-if="this.departmentOptions[0]"
              v-on:change="updateUnit()"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row>
        <b-col></b-col>
        <b-col md="3">
          <b-form-group label-cols="4" label="Unit:" label-align="left">
            <b-form-select
              v-model="curSelectedUnit"
              :options="this.curUnitOptions"
              :disabled="!curSelectedDept" 
              
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="3">
          <table class="center">
            <tr>
              <td class="d-flex justify-content-center">
                <button class="btn">Submit</button>
              </td>
              <td class="d-flex justify-content-center">
                <router-link
                  to="/login"
                  style="display: flex; align-items: center;"
                >
                  <a>Return to login</a></router-link
                >
              </td>
            </tr>
          </table>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { auth, database } from "../assets/firebase.js";

export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
        password: "",
        password2: "",
        unit: "",
        uid: ""
      },
      departmentOptions: [],
      unitsList: [],
      curUnitOptions: [],
      curSelectedDept: null,
      curSelectedUnit: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    updateUnit() {
      this.curUnitOptions = this.unitsList
        .filter(x => x.department == this.curSelectedDept)
        .map(y => y.unit);
    },
    fetchData() {
      database
        .collection("units")
        .get()
        .then(units =>
          units.forEach(unit => {
            let unitRecord = {
              unitId: unit.id,
              unit: unit.data().name,
              department: ""
            };
            unit
              .data()
              .department.get()
              .then(department => {
                unitRecord.department = department.data().name;

                this.unitsList.push(unitRecord);
                if (!this.departmentOptions.includes(department.data().name)) {
                  this.departmentOptions.push(department.data().name);
                }
              });
          })
        );
    },
    submit() {
      const name = this.form.name;
      const phone = this.form.phone;
      const email = this.form.email;
      const unitId = this.unitsList
        .filter(x => x.unit == this.curSelectedUnit)
        .map(y => y.unitId)[0];
      const unitRef = database.doc("/units/" + unitId);
      if (this.form.password == this.form.password2) {
        auth
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            database
              .collection("employees")
              .add({
                name: name,
                phone: phone,
                email: email,
                uid: data.user.uid,
                unit: unitRef,
                admin: false,
                avatar:
                  "https://ui-avatars.com/api/?name=" +
                  name.replaceAll(" ", "+")
              })
              .then(x => {
                x;
                this.$router.push({ path: "/" }).catch(error => error);
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode);
            alert(errorMessage);
          });
      } else {
        alert("Password does not match");
      }
    }
  }
};
</script>

<style scoped>
.signup {
  height: 100%;
  background-color: #d3edf9;
}
a {
  display: block;
  text-decoration: none;
  font-weight: 600;
  transition-property: color, background;
  transition-duration: 0.3s;
  text-align: center;
  display: flex;
  align-items: center;
}
/*
input {
  width: 10vw;
  height: 3vh;
}
*/
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
