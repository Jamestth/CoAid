<template>
  <div class="analytics pt-5">
    <!-- <h1> test </h1> <br> -->
    <div class="filters">
      <h1>Analytics</h1>
      <p style="font-size: 15px">*{{ selectedDay.name }}</p>
      <br />
      <br />
      <div class="filter-item">
        <label class="filter-labels">Time Period</label>
        <multiselect
          select-label=""
          :show-labels="false"
          track-by="name"
          label="name"
          v-model="selectedDay"
          :options="daysOptions"
          :close-on-select="true"
          :max-height="150"
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }"
            ><span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} Employee selected</span
            ></template
          >
        </multiselect>
      </div>
      <div class="filter-break"></div>
      <div class="filter-item">
        <label class="filter-labels">Department</label>
        <multiselect
          select-label=""
          :show-labels="false"
          :limit="4"
          group-values="depts"
          group-label="allGroup"
          track-by="name"
          label="name"
          :group-select="true"
          v-model="selectedDepartments"
          :options="departmentOptions"
          :close-on-select="false"
          multiple
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }"
            ><span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} Department selected</span
            ></template
          >
        </multiselect>
      </div>

      <div class="filter-break"></div>
      <div class="filter-item">
        <label class="filter-labels"> Employees Involved </label>
        <multiselect
          select-label=""
          :show-labels="false"
          group-values="emps"
          group-label="allGroup"
          track-by="name"
          label="name"
          :group-select="true"
          v-model="selectedContacts"
          :options="contactOptions"
          :close-on-select="false"
          multiple
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }"
            ><span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} Employee selected</span
            ></template
          >
        </multiselect>
      </div>
    </div>
    <div class="charts">
      <!-- 1st quadrant: Top 10 Risky & Danger List -->
      <div class="chart-item">
        <label class="title"> Potential contacts by Filtered Employees </label>
        <div class="listbox">
          <employeeList
            :data="filteredContacts"
            :key="fetchedCheckDeptFlag"
          ></employeeList>
        </div>
      </div>

      <!-- 2nd quadrant:  -->
      <div class="chart-item">
        <label class="title"
          >Number of Risky and Dangerous Employees in a Day</label
        >
        <div class="chart-box">
          <DangerRiskyChart
            :data="filteredCheckIn"
            :selectedDay="selectedDay"
            :key="fetchedCheckDeptFlag"
          ></DangerRiskyChart>
        </div>
      </div>
      <div class="break"></div>

      <!-- 3rd quadrant: @Matheus: you can insert calendar feature here
      calendar feature to include function: when clicked on specific date,
      list of names of employees who have checked in & their contact number 
      will appear in a pop up
       -->
      <div class="chart-item">
        <label class="title">Check-ins per Day</label>
        <div class="chart-box">
          <Calendar color="blue" :attributes="calattr" is-expanded />
        </div>
      </div>

      <!-- 4th quadrant -->
      <div class="chart-item">
        <label class="title">
          Most used Meeting Locations by Potential Contacts & Employees
        </label>
        <div class="chart-box">
          <MeetingLocationChart
            :data="filteredMeetings"
            :selectedDay="selectedDay"
            :key="fetchedCheckDeptFlag"
          ></MeetingLocationChart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import employeeList from "./../components/employeeList";
import { DateTime } from "luxon";
import { database } from "./../assets/firebase";
import Multiselect from "vue-multiselect";
import DangerRiskyChart from "./../components/StatusBar.vue";
import MeetingLocationChart from "./../components/BarChart.vue";
import Calendar from "v-calendar/lib/components/calendar.umd";

export default {
  components: {
    employeeList,
    DangerRiskyChart,
    Multiselect,
    MeetingLocationChart,
    Calendar,
  },
  data() {
    return {
      selectedDay: { name: "Last 14 days", value: -14 },
      deptempsize: 0,
      empsDeptSize: 0,
      fetchedCheckDeptFlag: 0,
      updatingFilterFlag: false,
      checkinsize: null,
      deptcheckinsize: 0,
      checkIn: [],
      filteredCheckIn: [],
      filteredContacts: [],
      filteredMeetings: [],
      employees: [],
      meetings: [],
      selectedDepartments: [],
      departmentOptions: [
        {
          allGroup: "All",
          depts: [],
        },
      ],
      contactOptions: [
        {
          allGroup: "All",
          emps: [],
        },
      ],
      daysOptions: [
        { name: "Last 7 days", value: -7 },
        { name: "Last 14 days", value: -14 },
        { name: "Last 30 days", value: -30 },
        { name: "Last 90 days", value: -90 },
      ],
      selectedContacts: [],
      OldSelectedContacts: ["null"],
      OldSelectedDepts: [],
      //Calendar Attributes
      calattr: [],
    };
  },
  watch: {
    fetchedCheckDeptFlag: function () {
      this.updateFilter();
    },
    deptcheckinsize: function () {
      if (this.checkinsize == this.deptcheckinsize) {
        this.fetchedCheckDeptFlag++;
      }
    },
    empsDeptSize: function () {
      if (this.empsDeptSize == this.deptempsize) {
        this.fetchedCheckDeptFlag++;
      }
    },
    selectedDepartments: function () {
      this.updatingFilterFlag = true;
      this.fetchedCheckDeptFlag++;
    },
    selectedContacts: function () {
      if (this.OldSelectedContacts.length != this.selectedContacts.length) {
        this.fetchedCheckDeptFlag++;
        this.OldSelectedContacts = this.selectedContacts;
      }
    },
    selectedDay: function () {
      this.fetchedCheckDeptFlag++;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    updateFilter() {
      let filteredDepts = this.selectedDepartments.map((x) => x.id);

      this.filteredCheckIn = this.checkIn.filter((x) =>
        filteredDepts.includes(x.departmentid)
      );

      this.filteredCheckIn = this.filteredCheckIn.filter((x) => {
        return (
          DateTime.fromISO(DateTime.fromSeconds(x.checkIn.seconds).toISODate())
            .diff(DateTime.fromISO(DateTime.local().toISODate()), ["days"])
            .toObject().days >= this.selectedDay.value
        );
      });

      if (this.empsDeptSize == this.deptempsize) {
        this.contactOptions[0].emps = this.employees.filter((x) => {
          return filteredDepts.includes(x.departmentid);
        });
        if (this.OldSelectedDepts.length != this.selectedDepartments.length) {
          this.selectedContacts = this.employees.filter((x) =>
            this.contactOptions[0].emps.includes(x)
          );
          this.OldSelectedDepts = this.selectedDepartments;
        }
      }

      /*
      this.selectedContacts = this.selectedContacts.filter(x =>
        filteredDepts.includes(x.departmentid)
      );
      */
      let selectedContactsId = this.selectedContacts.map((x) => x.id);
      let contactedCheckins = this.filteredCheckIn.filter((x) =>
        selectedContactsId.includes(x.employee)
      );
      let contactedCheckinDates = contactedCheckins.map((x) =>
        DateTime.fromSeconds(x.checkIn.seconds).toFormat("DD")
      );

      this.filteredCheckIn = this.filteredCheckIn.filter((x) =>
        contactedCheckinDates.includes(
          DateTime.fromSeconds(x.checkIn.seconds).toFormat("DD")
        )
      );
      let contactedAllempsId = this.filteredCheckIn.map((x) => x.employee);
      this.filteredContacts = this.employees.filter((x) =>
        contactedAllempsId.includes(x.id)
      );
      this.filteredMeetings = this.meetings.filter((meeting) => {
        return meeting.employeesids.some((empid) =>
          contactedAllempsId.includes(empid)
        );
      });

      //     this.filteredContacts = this.employees

      //this.filteredCheckIn.forEach(this.checkIn);
      //let filteredContacts = this.employees.filter(x => fil);
    },
    fetchData() {
      database
        .collection("departments")
        .get()
        .then((departments) =>
          departments.forEach((department) => {
            let departmentRecord = {
              name: department.data().name,
              id: department.id,
            };
            this.departmentOptions[0].depts.push(departmentRecord);
            this.selectedDepartments.push(departmentRecord);
          })
        );
      database
        .collection("meetings")
        .get()
        .then((meetings) =>
          meetings.forEach((meeting) => {
            let meetingRecord = meeting.data();
            this.meetings.push(meetingRecord);
            meetingRecord.employeesids = [];
            meetingRecord.acceptedids = [];

            meeting
              .data()
              .location.get()
              .then(
                (location) =>
                  (meetingRecord.locationName = location.data().name)
              );
            meeting.data().employees.forEach((emp) => {
              meetingRecord.employeesids.push(emp.id);
            });

            meeting.data().accepted.forEach((emp) => {
              meetingRecord.acceptedids.push(emp.id);
            });
          })
        );
      database
        .collection("checkIn")
        .get()
        .then((checkIns) => {
          this.checkinsize = checkIns.size;

          checkIns.forEach((checkIn) => {
            let checkInRecord = checkIn.data();
            checkInRecord.id = checkIn.id;

            database
              .collection("employees")
              .doc(checkIn.data().employee)
              .get()
              .then((emp) =>
                emp
                  .data()
                  .unit.get()
                  .then((unit) => {
                    unit
                      .data()
                      .department.get()
                      .then((department) => {
                        checkInRecord.departmentid = department.id;
                        this.deptcheckinsize++;
                      });
                  })
              );

            this.checkIn.push(checkInRecord);
          });
        });

      database
        .collection("employees")
        .get()
        .then((emps) => {
          this.deptempsize = emps.size;
          emps.forEach((emp) => {
            let empRecord = emp.data();
            empRecord.id = emp.id;
            empRecord.unit.get().then((unit) => {
              empRecord.unitname = unit.data().name;
              empRecord.unitid = unit.id;
              unit
                .data()
                .location.get()
                .then((loc) => {
                  empRecord.unitLocation = loc.data().name;
                  empRecord.unitLocationid = loc.id;
                });
              unit
                .data()
                .department.get()
                .then((dept) => {
                  empRecord.department = dept.data().name;
                  empRecord.departmentid = dept.id;
                  this.empsDeptSize++;
                });
            });
            this.employees.push(empRecord);
            this.contactOptions[0].emps.push(empRecord);
            this.selectedContacts.push(empRecord);
          });
        });

      database
        .collection("checkIn")
        .get()
        .then((entries) => {
          var dates = {};
          entries.forEach((entry) => {
            var date = entry.data().checkIn.toDate();
            date.setHours(0, 0, 0, 0);
            dates[date] = (dates[date] || 0) + 1;
          });
          for (var date in dates) {
            var attr = {
              bar: true,
              dates: new Date(date),
              popover: {
                label: dates[date].toString() + " check-ins",
                visibility: "hover",
                hideIndicator: true,
              },
            };
            console.log(typeof date);

            this.calattr.push(attr);
          }
        });
      console.log(this.calattr);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@500");

/deep/.h1 {
  font-family: "DM Sans", sans-serif !important;
}
/deep/a {
  color: #20368f;
}
/deep/.label {
  display: inline-block;
  font-weight: bold;
  font-size: 1.7vh;
  font-family: "DM Sans", Avenir, Helvetica, Arial, sans-serif;
  padding: 30px;
}
/deep/.multiselect__select {
}
/deep/.multiselect {
  width: 18vw;
  border-color: #767676;
  font-size: 15px;
}
/deep/.multiselect__tags {
  border: 1px solid #767676;
  padding: 0px 40px 0 5px;
  border-radius: px;
  background: #fff;
}
/deep/.multiselect,
/deep/.multiselect_input,
/deep/.multiselect_single {
  font-family: inherit;
  font-size: 15px;
  padding-right: 1vw;
  padding-left: 1vw;
}
/deep/.multiselect_single {
  width: 10px;
}
.filter-labels {
}
.analytics {
  display: flex;
}

.break {
  flex-basis: 100%;
  height: 0;
  padding: 2.5vh;
}
.filter-break {
  flex-basis: 100%;
  height: 0;
}

.filters {
  width: 20vw;
  justify-content: space-around;
}
.filter-item {
  width: 20vw;
  height: 10vh;
}
.title {
  height: 3vh;
  vertical-align: center;
  margin: 0;
}

.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80vw;
}

.chart-item {
  width: 37vw;
  height: 40vh;
  border: 1px solid lightgray;
  align-items: center;
}
.listbox {
  width: 37vw;
  height: 37vh;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
}
.chart-box {
  width: 35vw;
  height: 37vh;
}
</style>