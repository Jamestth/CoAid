<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col></b-col>
      <b-col cols="12" md="8">
        <!-- Notifications -->
        <b-container fluid>
          <b-row class="pl-3 pr-3 pt-3">
            <h1 style="text-align:left; font-size:5vh;">Dashboard</h1>
          </b-row>
          <b-row class="notif">
            <b-col>
              <b-card class="mb-3" header="Notifications">
                <b-row class="pl-2" v-if="!check(this.userInfo)">
                  <p style="text-align:left; font-size:2.5vh;">
                    Last Check Out:
                    <strong>{{ getCheckOutTime(this.userInfo) }}</strong>
                  </p>

                  <router-link
                    to="/healthdeclaration"
                    tag="button"
                    class="btn"
                    style="margin:0"
                    v-on:click="check"
                  >
                    <span v-on:click="this.check">Check In</span>
                  </router-link>
                </b-row>
                <b-row class="pl-2 pt-2" v-if="!check(this.userInfo)">
                  <p style="text-align:left; font-size:2.5vh ">
                    Rotation Team:
                    <strong>A</strong>
                    <br />
                    <!-- { this.userInfo.rotationTeam } -->
                    You can report to office this week
                  </p>
                </b-row>
                <b-row class="pl-2" v-if="check(this.userInfo)">
                  <p style="text-align:left; font-size:2.5vh;">
                    Last Check In:
                    <strong>{{ getCheckInTime(this.userInfo) }}</strong>
                  </p>

                  <p class="ml-3">
                    <button tag="button" class="btn" style="margin:0">
                      <span v-on:click="this.checkOut">Check Out</span>
                    </button>
                  </p>
                </b-row>
                <b-row class="pl-2 pt-2" v-if="check(this.userInfo)">
                  <p style="text-align:left; font-size:2.5vh ">Status:</p>
                  <p class="ml-3" :style="statusColor">
                    {{ this.userInfo.status }}
                  </p>
                  <br />
                </b-row>
                <!-- Display -->
              </b-card>
            </b-col>
            <b-col cols="6">
              <b-row class="mb-4">
                <b-col cols="6">
                  <b-card header="Risky" id="risky Symptoms">
                    <AttendanceDonut
                      v-bind:sections="attendanceStatistic.risky"
                    ></AttendanceDonut>
                  </b-card>
                  <!-- risky popover -->
                  <b-popover
                    target="risky Symptoms"
                    triggers="hover"
                    placement="top"
                  >
                    <template #title>Employees at Risk</template>

                    <b-list-group>
                      <b-list-group-item
                        v-for="emp in this.riskyList"
                        :key="emp.employeeId"
                      >
                        <b-avatar
                          :src="emp.avatar"
                          style="float:left; "
                        ></b-avatar>
                        <p>{{ emp.name }}</p>
                      </b-list-group-item>
                    </b-list-group>
                  </b-popover>
                </b-col>
                <!-- danger popover --> 
                <b-col cols="6">
                  <b-card header="Danger" id="danger">
                    <AttendanceDonut
                      v-bind:sections="attendanceStatistic.danger"
                    ></AttendanceDonut>
                  </b-card>
                  <b-popover 
                  target="danger" 
                  triggers="hover" 
                  placement="top"
                  >
                    <template #title>Employees in Danger</template>
                    <b-list-group>
                      <b-list-group-item
                        v-for="emp in this.dangerList"
                        :key="emp.employeeId"
                      >
                        <b-avatar
                          :src="emp.avatar"
                          style="float:left; "
                        ></b-avatar>

                        <p>{{ emp.name }}</p>
                      </b-list-group-item>
                    </b-list-group>
                  </b-popover>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>

        <!-- Main table element -->
        <b-container>
          <b-row class="pb-3">
            <b-col>
              <h2 style="text-align:left; font-size:5vh;">Colleagues</h2>
            </b-col>
            <b-col cols="6" class="mr-auto">
              <b-form-group
                label="Department"
                label-class="font-weight-bold"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  v-model="filter.department"
                  id="perPageSelect"
                  size="sm"
                  :options="filterOptions"
                ></b-form-select>
              </b-form-group>
              <b-form-group
                class="mb-0"
                label="Name"
                label-class="font-weight-bold"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter.name"
                    type="search"
                    id="filterInput"
                    placeholder="Search by Name"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-table
            show-empty
            small
            stacked="md"
            :items="employees"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-function="filterPredicate"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            :striped="true"
            :bordered="true"
            :hover="true"
            :head-variant="headVariant"
          >
            <template v-slot:cell(avatar)="row">
              <b-avatar :src="row.item.avatar" size="2rem"></b-avatar>
              {{ row.empty }}
            </template>
            <template v-slot:cell(status)="row">
              <BadgePopover
                v-bind:row="row"
                v-if="
                  row.item.lastCheck && row.item.office && row.item.department
                "
              ></BadgePopover>
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            class="pb-4"
          ></b-pagination>
        </b-container>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>
<script>
import stringSimilarity from "string-similarity";
import { DateTime } from "luxon";
import AttendanceDonut from "../components/AttendanceDonut.vue";
import BadgePopover from "../components/BadgePopover";
import { firebase, auth, database } from "../assets/firebase";
export default {
  components: { AttendanceDonut, BadgePopover },
  data() {
    return {
      attendanceStatistic: {
        risky: [{ value: 100, color: "#ffc107", number: 0 }],
        danger: [{ value: 100, color: "#dc3545", number: 0 }]
      },
      employees: [],
      checkedIn: false,
      userInfo: null,
      fields: [
        {
          key: "avatar",
          label: "",
          sortable: false
        },
        {
          key: "name",
          label: "Employee",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "department",
          label: "Department",
          sortable: true,
          class: "text-center"
        },
        {
          key: "status",
          label: "Status",
          // eslint-disable-next-line no-unused-vars
          formatter: (value, key, item) => {
            if (value == "COVID") {
              return 3;
            } else if (value == "Healthy") {
              return 1;
            } else if (value == "danger") {
              return 2;
            } else {
              return -1;
            }
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        }
      ],
      numRisky: 0,
      numDanger: 0,
      riskyList: [],
      dangerList: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: {
        department: "All",
        name: ""
      },
      filterOptions: ["All", "HR", "Marketing", "IT", "Sales"],
      headVariant: "dark"
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    statusColor() {
      if (this.userInfo.status == "Safe") {
        return {
          color: "#008000",
          "text-align": "left",
          "font-size": "2.5vh"
        };
      } else if (this.userInfo.status == "Risky") {
        return {
          color: "#FFA500",
          "text-align": "left",
          "font-size": "2.5vh"
        };
      } else if (this.userInfo.status == "Danger") {
        return {
          color: "#FF0000",
          "text-align": "left",
          "font-size": "2.5vh"
        };
      } else {
        return {
          color: "#000000",
          "text-align": "left",
          "font-size": "2.5vh"
        };
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      var user = auth.currentUser;
      this.userId = user.uid;

      //this.userId = "IAvKPChVuFfkH176PMgdkwAvdfE2"; //remove when auth works
      database
        .collection("employees")
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(employee => {
            let employeeData = employee.data();
            //console.log(employee.data())
            let records = {
              eid: employee.id,
              uid: employeeData.uid,
              name: employeeData.name,
              avatar: employeeData.avatar,
              email: employeeData.email,
              phone: employeeData.phone,
              department: "",
              unit: "",
              lastCheck: {},
              status: "Out of Office",
              statusType: "secondary",
              office: ""
            };
            this.employees.push(records);
            this.userInfo = this.employees.filter(x => x.uid == this.userId)[0];
            this.totalRows = this.employees.length;

            employeeData.unit.get().then(unit => {
              unit = unit.data();
              records.unit = unit.name;

              unit.location.get().then(location => {
                records.office = location.data().name;
              });

              unit.department.get().then(department => {
                records.department = department.data().name;
              });
            });
            database
              .collection("checkIn")
              .where("employee", "==", employee.id)
              .orderBy("checkIn", "desc")
              .limit(1)
              //.where("Temperature", "==",36.5)
              .get()
              .then(snap => {
                snap.forEach(checkInRecord => {
                  records.lastCheck = {
                    checkIn: checkInRecord.data().checkIn,
                    checkOut: checkInRecord.data().checkOut,
                    //location: checkInRecord.data().location,
                    fluFlag: checkInRecord.data().fluFlag,
                    shnFlag: checkInRecord.data().shnFlag,
                    contactFlag: checkInRecord.data().contactFlag,
                    temperature: checkInRecord.data().temperature
                  };
                  records.status =
                    checkInRecord.data().checkOut === undefined
                      ? this.evaluateStatus(
                          records.lastCheck.fluFlag,
                          records.lastCheck.shnFlag,
                          records.lastCheck.contactFlag,
                          records.lastCheck.temperature
                        )
                      : "Out of Office";
                  records.statusType =
                    checkInRecord.data().checkOut === undefined
                      ? this.getStatusType(records.status)
                      : "secondary";
                  if (records.status == "Danger") {
                    this.dangerList.push(records);
                    this.attendanceStatistic.danger[0].number++;
                  } else if (records.status == "Risky") {
                    this.riskyList.push(records);
                    this.attendanceStatistic.risky[0].number++;
                  }
                });
              });
          });
        });
    },
    evaluateStatus(fluFlag, shnFlag, contactFlag, temperature) {
      let status = "???";

      if (fluFlag !== undefined) {
        let flags =
          Number(fluFlag) +
          Number(shnFlag) +
          Number(contactFlag) +
          Number(temperature > 37.5);
        status = flags == 0 ? "Safe" : flags < 3 ? "Risky" : "Danger";
      } else {
        status = "Out of Office";
      }
      return status;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    filterPredicate(item, filter) {
      var deptPred =
        filter.department == "All" || item.department == filter.department;
      //var filterlen = filter.name.length;
      var itemSubstring = item.name.toUpperCase(); ///item.name.substring(0, filterlen).toUpperCase();
      var searchString = filter.name.toUpperCase();
      var namePred =
        filter.name == "" ||
        stringSimilarity.compareTwoStrings(itemSubstring, searchString) >= 0.2;
      return deptPred && namePred;
    },
    check(userInfo) {
      if (userInfo) {
        if (Object.keys(userInfo.lastCheck).length != 0) {
          return userInfo.lastCheck.checkOut === undefined;
        } else {
          return false;
        }
      }
    },
    getStatusType(status) {
      if (status == "Risky") {
        return "warning";
      } else if (status == "Safe") {
        return "success";
      } else if (status == "Danger") {
        return "danger";
      } else {
        return "secondary";
      }
    },
    getCheckInTime(userInfo) {
      try {
        return DateTime.fromSeconds(
          userInfo.lastCheck.checkIn.seconds
        ).toFormat(`ff`);
      } catch (err) {
        return "None";
      }
    },
    getCheckOutTime(userInfo) {
      if (userInfo.lastCheck.checkOut === undefined) {
        return "None";
      } else {
        return DateTime.fromSeconds(
          userInfo.lastCheck.checkOut.seconds
        ).toFormat(`ff`);
      }
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
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@500");

h1 {
  font-family: "DM Sans", sans-serif !important;
}

h2 {
  font-size: 10px;
  font-family: "DM Sans", sans-serif !important;
}
.attendance {
  color: #28a745;
  font-size: 3vw;
  padding: 0;
  text-align: center;
  top: 50%;
}
.slash {
  font-size: 2vw;
  margin: auto;
  margin-right: 0;
  margin-left: 0;
  padding: 0;
  text-align: center;
}
.maxAttendance {
  font-size: 3vw;
  text-align: center;
  margin: auto;
  padding: 0;
  margin-right: 0;
  margin-left: 0;
}
p {
  padding: 0;
  margin: auto;
  margin-right: 0;
  margin-left: 0;
}
.percentAttendance {
  color: #28a745;
  font-size: 2vw;
}
small {
  font-size: 1vw;
}

.card-header {
  padding: 0.5vw;
  margin-bottom: 0;
  background-color: darkblue;
  font-size: 2vh;
  color: white !important;
  font-weight: bold;
}
/deep/ .table .thead-dark th {
  color: #fff;
  background-color: darkblue !important;
}
/deep/ .page-item.active .page-link {
  background-color: #3e536a !important;
}
/deep/ .page-link {
  color: #3e536a;
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
