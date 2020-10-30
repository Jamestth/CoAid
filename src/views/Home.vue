<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col></b-col>
      <b-col cols="8">
        <b-row class="pl-3 pr-3">
          <h1 style="text-align:left; font-size:5vh;">
            Welcome back {{ this.userInfo.name }}
          </h1>
        </b-row>
        <b-row class="pl-3 pr-3">
          <p style="text-align:left; font-size:2.5vh;">
            Your last check in was on
            <strong>{{ this.lastCheckIn }}</strong
            >.
          </p>
        </b-row>
        <b-row class="pl-3 pr-3 pt-2 pb-3" v-show="checkedIn">
          <p style="text-align:left; font-size:2.5vh ">
            Would you like to check in?
          </p>
          <router-link
            to="/CheckInsuccess"
            tag="button"
            class="btn ml-3"
            style="margin:0"
            v-on:click="check"
            ><span v-on:click="this.check">Check In</span></router-link
          >
        </b-row>
        <b-row class="pl-3 pr-3 pt-2 pb-3" v-show="!checkedIn">
          <p style="text-align:left; font-size:2.5vh ">
            Would you like to check out?
          </p>
          <router-link
            to="/CheckOutsuccess"
            tag="button"
            class="btn ml-3"
            style="margin:0"
          >
            <span v-on:click="this.check">Check Out</span></router-link
          >
        </b-row>
        <!-- User Interface controls -->
        <b-row class="mb-4">
          <b-col cols="4">
            <b-card header="Healthy">
              <AttendanceDonut
                v-bind:sections="attendanceStatistic.healthy"
              ></AttendanceDonut>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card header="Sick">
              <AttendanceDonut
                v-bind:sections="attendanceStatistic.sick"
              ></AttendanceDonut>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card header="Covid">
              <AttendanceDonut
                v-bind:sections="attendanceStatistic.covid"
              ></AttendanceDonut>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="pb-3">
          <b-col></b-col>
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
        <!-- Main table element -->
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
            <b-avatar
              src="https://placekitten.com/300/300"
              size="2rem"
            ></b-avatar>
            {{ row.empty }}
          </template>
          <template v-slot:cell(status)="row">
            <BadgePopover v-bind:row="row"></BadgePopover>
          </template>
        </b-table>

        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          class="pb-4"
        ></b-pagination>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>
<script>
import stringSimilarity from "string-similarity";
import employees from "../assets/Emp.js";
import departments from "../assets/DepartmentDetails.js";
import CheckIn from "../assets/Checkin.js";
import { DateTime } from "luxon";
import AttendanceDonut from "../components/AttendanceDonut.vue";
import BadgePopover from "../components/BadgePopover";
import db from "../assets/firebase";
export default {
  components: { AttendanceDonut, BadgePopover },
  data() {
    return {
      attendanceStatistic: {
        healthy: [{ value: 100, color: "#28a745", number: 30 }],
        sick: [{ value: 100, color: "#ffc107", number: 10 }],
        covid: [{ value: 100, color: "#dc3545", number: 5 }],
      },
      departments: departments,
      CheckIn: CheckIn,
      employees: employees,
      lastCheckOut: "",
      lastCheckIn: "",
      checkedIn: false,
      userId: "",
      userInfo: [],
      fields: [
        {
          key: "avatar",
          label: "",
          sortable: false,
        },
        {
          key: "name",
          label: "Employee",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "department",
          label: "Department",
          sortable: true,
          class: "text-center",
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
            } else {
              return 2;
            }
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: {
        department: "All",
        name: "",
      },
      filterOptions: ["All", "HR", "Marketing", "IT", "Sales"],
      headVariant: "dark",
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    db.collection("meetings")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach( (x) => console.log(x.data().location.name));
      });

    // Set the initial number of items

    this.totalRows = this.employees.length;
    // Get user info
    this.userId = this.$store.getters.getUser;
    //this.userInfo = this.employees.filter((x) => x.eID == this.userId)[0];
    //console.log(this.employees)
    this.employees = this.employees.map((x) => {
      let lastCheckIn = this.CheckIn.filter((y) => y.eId == x.eId).sort(
        (a, b) => b.checkIn - a.checkIn
      )[0];
      let status = lastCheckIn === undefined ? "None" : lastCheckIn.status;
      return {
        eId: x.eId,
        name: x.name,
        avatar: x.avatar,
        status: status,
        statusType: this.getStatusType(status),
        department: this.departments.filter((y) => y.uId == x.uId)[0]
          .department,
      };
    });
    //console.log(this.userInfo);
    this.CheckIn = this.CheckIn.filter((x) => x.eId == this.userId).sort(
      (y, x) => x.checkIn - y.checkIn
    )[0];
    //console.log(this.CheckIn);
    this.lastCheckIn = DateTime.fromMillis(this.CheckIn.checkIn).toFormat(`ff`);
    this.lastCheckOut = DateTime.fromMillis(this.CheckIn.checkOut).toFormat(
      `ff`
    );
    if (this.lastCheckOut == "undefined") {
      this.checkedIn = true;
    }
    this.checkedIn = this.$store.getters.getCheckIn;

    //gets current timestamp, store this for check ins
    //console.log(new Date().getTime());

    //getting users
    //console.log(this.$store.getters.getUser);
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    filterPredicate(item, filter) {
      var deptPred =
        filter.department == "All" || item.department == filter.department;
      var filterlen = filter.name.length;
      var itemSubstring = item.name.substring(0, filterlen).toUpperCase();
      var searchString = filter.name.toUpperCase();
      var namePred =
        filter.name == "" ||
        stringSimilarity.compareTwoStrings(itemSubstring, searchString) >= 0.4;
      return deptPred && namePred;
    },
    check() {
      console.log(this.checkedIn);
      this.$store.actions.check;
      console.log(this.checkedIn);
      this.checkedIn = this.$store.getters.getCheckIn;
    },
    getStatusType(status) {
      if (status == "COVID") {
        return "danger";
      } else if (status == "Healthy") {
        return "success";
      } else if (status == "Sick") {
        return "warning";
      } else {
        return "secondary";
      }
    },
  },
};
</script>
<style scoped>
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
  background-color: #3e536a;
  font-size: 2vh;
  color: white !important;
  font-weight: bold;
}
/deep/ .table .thead-dark th {
  color: #fff;
  background-color: #3e536a !important;
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
