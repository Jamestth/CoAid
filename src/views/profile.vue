<template>
  <b-row class="p-3">
    <b-col></b-col>
    <b-col md="4">
      <div v-if="profileFound">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-col> </b-col>
          <b-img
            v-bind:src="userInfo.avatar"
            rounded="circle"
            width="200"
            height="200"
            :key="userInfo.avatar"
          ></b-img>
          <b-row v-if="editMode">
            <b-col> </b-col>
            <b-col>
              <b-form-file
                accept=".jpg, .png, .gif"
                v-model="file"
                class="mt-3"
                plain
              ></b-form-file>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-form-group
            label-cols="3"
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            label-align="left"
            class="pt-5"
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
            label-cols-sm="3"
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
              pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
              required
              :disabled="!editMode"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            id="input-group-3"
            label="Department:"
            label-for="input-3"
            label-align="left"
          >
            <b-form-select
              id="input-3"
              v-model="userInfo.department"
              :options="departmentOptions"
              required
              v-on:change="updateUnitOptions()"
              :disabled="!editMode"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            id="input-group-4"
            label="Unit:"
            label-for="input-4"
            label-align="left"
          >
            <b-form-select
              id="input-4"
              v-model="userInfo.unit"
              :options="curUnitOptions"
              required
              :disabled="!editMode"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            id="input-group-5"
            label="Contact:"
            label-for="input-5"
            label-align="left"
          >
            <b-form-input
              id="input-5"
              v-model="userInfo.phone"
              placeholder="Enter Contact details"
              required
              pattern="[0-9]{8}"
              type="tel"
              :disabled="!editMode"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            v-if="isAdmin"
            id="input-group-6"
            label-for="input-6"
            label-align="left"
          >
            <b-form-checkbox
              id="input-6"
              v-model="userInfo.admin"
              name="check-button"
              :disabled="!editMode"
              size="lg"
              switch
            >
              Is an Admin
            </b-form-checkbox>
          </b-form-group>

          <b-button class="mr-3" type="submit" v-if="editMode">Submit</b-button>
          <b-button class="ml-3" type="reset" v-if="editMode">cancel</b-button>
          <b-row class="mb-4"></b-row>
        </b-form>
        <b-button
          type="button"
          v-on:click="switchToEditMode()"
          v-if="!editMode && isEditor()"
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
import { storage, auth, database } from "../assets/firebase";
export default {
  components: {},
  data() {
    return {
      testavatar: "",
      file: null,
      profileFound: true,
      editMode: false,
      departmentOptions: [],
      unitsList: [],
      curUnitOptions: [],
      checkedIn: false,
      userInfo: {
        avatar: "",
        department: "",
        eid: "",
        email: "",
        name: "",
        office: "",
        phone: "",
        uid: "",
        unit: ""
      },
      isAdmin: null,
      empId: null,
      userInfoOrignal: {}
    };
  },
  computed: {},
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.userInfo));

      //let extension = this.file.name.split(".").pop();
      let unitId = this.unitsList.filter(x => x.unit == this.userInfo.unit)[0]
        .unitId;
      let unitRef = database.doc("/units/" + unitId);
      database
        .collection("employees")
        .doc(this.userInfo.eid)
        .update({
          name: this.userInfo.name,
          email: this.userInfo.email,
          phone: this.userInfo.phone,
          unit: unitRef,
          admin: this.userInfo.admin
        });
      this.isAdmin = this.userInfo.admin;
      try {
        let filepath = "avatar/" + this.userInfo.uid;
        var storageRef = storage.ref();
        var fileRef = storageRef.child(filepath);
        if (this.file) {
          fileRef.put(this.file).then(snap => {
            snap;
            fileRef.getDownloadURL().then(snap => {
              this.userInfo.avatar = snap;
              database
                .collection("employees")
                .doc(this.userInfo.eid)
                .update({
                  avatar: this.userInfo.avatar
                });
            });
          });
        }
      } catch (err) {
        err;
      }

      this.editMode = !this.editMode;
    },
    isEditor() {
      return this.isAdmin || this.empId == this.userInfo.eid;
    },

    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.userInfo = JSON.parse(JSON.stringify(this.userInfoOrignal)); //deepcopy
      this.updateUnitOptions();
      this.editMode = !this.editMode;
    },
    updateUnitOptions() {
      this.curUnitOptions = JSON.parse(JSON.stringify(this.unitsList))
        .filter(x => x.department == this.userInfo.department)
        .map(y => y.unit);
    },
    switchToEditMode() {
      this.editMode = !this.editMode;
      this.userInfoOrignal = JSON.parse(JSON.stringify(this.userInfo));
    },
    fetchData: function() {
      var user = auth.currentUser;
      this.userId = user.uid;
      //this.userId = "IAvKPChVuFfkH176PMgdkwAvdfE2"; //remove when auth works
      database
        .collection("employees")
        .where("uid", "==", auth.currentUser.uid)
        .get()
        .then(emps =>
          emps.forEach(emp => {
            this.isAdmin = emp.data().admin;
            this.empId = emp.id;
          })
        );
      database
        .collection("employees")
        .doc(this.$route.params.id)
        .get()
        .then(snap => {
          let employee = snap;
          let employeeData = snap.data();
          let records = {
            eid: employee.id,
            uid: employeeData.uid,
            name: employeeData.name,
            avatar: employeeData.avatar,
            email: employeeData.email,
            phone: employeeData.phone,
            department: "",
            unit: "",
            office: "",
            admin: employeeData.admin
          };
          employeeData.unit.get().then(unit => {
            unit = unit.data();
            records.unit = unit.name;

            unit.location.get().then(location => {
              records.office = location.data().name;
            });

            unit.department.get().then(department => {
              records.department = department.data().name;
            });
            this.userInfo = records;

            database
              .collection("departments")
              .get()
              .then(snap =>
                snap.forEach(department => {
                  this.departmentOptions.push(department.data().name);
                })
              );
            database
              .collection("units")
              .get()
              .then(snap =>
                snap.forEach(unit => {
                  let unitRecords = {
                    unitId: unit.id,
                    unit: unit.data().name,
                    department: ""
                  };

                  unit
                    .data()
                    .department.get()
                    .then(department => {
                      unitRecords.department = department.data().name;

                      if (unitRecords.department == this.userInfo.department) {
                        this.curUnitOptions.push(unit.data().name);
                      }
                    });

                  this.unitsList.push(unitRecords);
                })
              );
          });
        });
    }
  }
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
