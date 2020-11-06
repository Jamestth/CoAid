<template>
  <div class="signup">
    <table class = "center">
    <tr><td height = "15px"></td></tr>
    <tr><td align = "center"><img src = "../assets/logomainpage.png" style = "width:20%"></td></tr>
    <tr><td align = "center"><img src = "../assets/coaidname.png" style = "width:20%"></td></tr>
    </table>

    <form @submit.prevent="submit">
      <b-container fluid>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> <label for="name"> Name: </label> </b-col>
          <b-col col lg="1"> <input
              type="text"
              id="name"
              name="name"
              v-model="form.name"
              required
            /></b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> <label for="phone"> Phone Number: </label> </b-col>
          <b-col col lg="1"><input
              type="tel"
              pattern="[0-9]{8}"
              id="phone"
              name="phone"
              v-model="form.phone"
            /></b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> <label for="email"> Email: </label> </b-col>
          <b-col col lg="1"><input
              type="text"
              id="email"
              name="email"
              pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
              v-model="form.email"
              required
            /></b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> <label for="password"> Password: </label> </b-col>
          <b-col col lg="1"><input
              type="password"
              id="password"
              name="password"
              v-model="form.password"
              required
            /></b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> <label for="password2"> Confirm Password: </label> </b-col>
          <b-col col lg="1"><input
              type="password"
              id="password2"
              name="password2"
              v-model="form.password2"
              required
            /></b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> <label for="department"> Department: </label> </b-col>
          <b-col col lg="1"><select
              id="department"
              v-model="curSelectedDept"
              style="width:100%"
              @change="updateUnit()"
              required
              :v-if="this.departmentOptions[0]"
            >
              <option
                v-for="department in this.departmentOptions"
                :key="department"
                >{{ department }}</option
              >
            </select></b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col col lg="1"> <label for="unit"> Unit: </label> </b-col>
          <b-col col lg="1"><select
              id="unit"
              v-model="curSelectedUnit"
              style="width:100%"
              required
            >
              <option v-for="unit in this.curUnitOptions" :key="unit">{{
                unit
              }}</option>
            </select></b-col>
        </b-row>
    </b-container>
      <table class="center">
        <tr>
          <td>
            <input type="submit" class="btn" />
          </td>
        </tr>
      </table>
    </form>
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
                this.departmentOptions.push(department.data().name);
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
          .then(function(data) {
            database
              .collection("employees")
              .add({
                name: name,
                phone: phone,
                email: email,
                uid: data.user.uid,
                unit: unitRef,
                avatar:
                  "https://ui-avatars.com/api/?name=" +
                  name.replaceAll(" ", "+")
              })
              .then(function() {
                console.log("Document successfully written!");
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

      // database
      //   .collection("employees")
      //   .add({
      //     name: this.form.name,
      //     phone: this.form.phone,
      //     email: this.form.email,
      //     uid: myuid,
      //     unit: this.form.unit,
      //     avatar: ""
      //   })
      //   .then(function() {
      //     console.log("Document successfully written!");
      //   })
      //   .catch(function(error) {
      //     console.error("Error writing document: ", error);
      //   });
      console.log("Finally!");
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
