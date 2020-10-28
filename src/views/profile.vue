<template>
  <b-row class="p-3">
    <b-col></b-col>
    <b-col cols="6">
      <div v-if="profileFound">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-col> </b-col>
          <b-img
            v-bind:src="userInfo.avatar"
            rounded="circle"
            width="200"
            height="200"
          ></b-img>
          <b-row v-if="editMode">
            <b-col> </b-col>
            <b-col>
              <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-form-group
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            label-align="left"
          >
            <b-form-input
              id="input-1"
              v-model="userInfo.name"
              required
              placeholder="Enter a name"
              :disabled="!editMode"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Email:"
            label-for="input-2"
            label-align="left"
          >
            <b-form-input
              id="input-2"
              v-model="userInfo.email"
              type="email"
              placeholder="Enter a email"
              required
              :disabled="!editMode"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Department:"
            label-for="input-3"
            label-align="left"
          >
            <b-form-select
              id="input-3"
              v-model="curDept"
              :options="Object.values(deptDict)"
              required
              v-on:change="updateUnitOptions()"
              :disabled="!editMode"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Unit:"
            label-for="input-4"
            label-align="left"
          >
            <b-form-select
              id="input-4"
              v-model="curUnit"
              :options="curUnitOptions"
              required
              :disabled="!editMode"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Mobile Contact:"
            label-for="input-5"
            label-align="left"
          >
            <b-form-input
              id="input-5"
              v-model="userInfo.contact"
              placeholder="Enter Contact details"
              required
              type="tel"
              :disabled="!editMode"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Office Contact:"
            label-for="input-6"
            label-align="left"
          >
            <b-form-input
              id="input-6"
              v-model="userInfo.office"
              placeholder="Enter office Contact"
              required
              :disabled="!editMode"
            ></b-form-input>
          </b-form-group>

          <b-button class = "mr-3" type="submit" v-if="editMode">Submit</b-button>
          <b-button  class = "ml-3"   type="reset" v-if="editMode">cancel</b-button>
    <b-row class = "mb-4"></b-row>
        </b-form>
        <b-button
          type="button"
          v-on:click="editMode = !editMode"
          v-if="!editMode"
          >Edit</b-button
        >
      </div>
      <div v-else>
        <p>Profile not found</p>
      </div>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
import employees from "../assets/Emp.js";
import CheckIn from "../assets/Checkin.js";
import departments from "../assets/DepartmentDetails.js";
export default {
  components: {},
  data() {
    return {
      CheckIn: CheckIn,
      employees: employees,
      departments: departments,
      profileFound: true,
      editMode: false,
      deptUnitDict: {},
      unitDeptDict: {},
      deptDict: {},
      unitDict: {},
      curDept: "",
      curUnitOptions: [],
      curUnit: "",
      lastCheckOut: "",
      lastCheckIn: "",
      checkedIn: false,
      userInfo: {
        eID: "",
        name: "",
        email: "",
        uId: "",
        office: "",
        contact: "",
        avatar: "",
        admin: "",
      },
      userInfoOrignal: {},
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      }
    };
  },
  computed: {},
  mounted() {
    var userInfo = this.employees.filter((x) => x.eID == this.$route.params.id);
    this.userInfo = userInfo[0];
    this.userInfoOrignal = JSON.parse(JSON.stringify(userInfo[0]));
    if (userInfo.length == 0) {
      this.profileFound = false;
    } else {
      this.departments.forEach((x) => {
        if (this.deptUnitDict[x.department] === undefined) {
          this.deptUnitDict[x.department] = [];
          this.deptUnitDict[x.department].push(x.unit);
        } else {
          this.deptUnitDict[x.department].push(x.unit);
        }
        this.unitDeptDict[x.unit] = x.department;
        this.deptDict[x.dId] = x.department;
        this.unitDict[x.uId] = x.unit;
      });
    }
    this.curUnit = this.unitDict[this.userInfo.uId];
    this.curDept = this.unitDeptDict[this.curUnit];

    this.updateUnitOptions();
    //console.log(Array.from(this.deptUnitDict.keys()));
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.userInfo = JSON.parse(JSON.stringify(this.userInfoOrignal)); //deepcopy
      this.curUnit = this.unitDict[this.userInfo.uId];

      this.curDept = this.unitDeptDict[this.curUnit];
      this.updateUnitOptions();
      this.editMode = !this.editMode;
      console.log("hi");
    },
    updateUnitOptions() {
      this.curUnitOptions = this.deptUnitDict[this.curDept];
    },
  },
};
</script>
<style scoped>
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
