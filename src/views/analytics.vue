<template>
  <div class="analytics pt-5">
    <div class="charts">
      <!-- 1st quadrant: Top 10 Risky & Danger List in past 30 days -->
      <div class="chart-item">
        <DangerRiskyChart
          :data="filteredCheckIn"
          :key="fetchedCheckDeptFlag"
        ></DangerRiskyChart>
      </div>

      <!-- 2nd quadrant: Risky & Danger Chart -->
      <div class="chart-item">
        <DangerRiskyChart
          :data="filteredCheckIn"
          :key="fetchedCheckDeptFlag"
        ></DangerRiskyChart>
      </div>
      <div class="break"></div>

      <!-- 3rd quadrant: -->
      <div class="chart-item">
        <label class="title">Possible contacts (Past 30 Days)</label>
        <div class="listbox">
          <employeeList
            :data="filteredContacts"
            :key="fetchedCheckDeptFlag"
          ></employeeList>
        </div>
      </div>
      <!-- 4th quadrant -->
      <div class="chart-item">
        <MeetingLocationChart
          :data="meetings"
          :key="fetchedCheckDeptFlag"
        ></MeetingLocationChart>
      </div>
    </div>
    <div class="filters">
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
      <div class="break"></div>
      <div class="filter-item">
        <label class="filter-labels">In contact with</label>
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
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import employeeList from "./../components/employeeList";
import { DateTime } from "luxon";
import { database } from "./../assets/firebase";
import Multiselect from "vue-multiselect";
import DangerRiskyChart from "./../components/StatusBar.vue";
import MeetingLocationChart from "./../components/BarChart.vue";
export default {
  components: {
    employeeList,
    DangerRiskyChart,
    Multiselect,
    MeetingLocationChart
  },
  data() {
    return {
      deptempsize: 0,
      empsDeptSize: 0,
      fetchedCheckDeptFlag: 0,
      updatingFilterFlag: false,
      checkinsize: null,
      deptcheckinsize: 0,
      checkIn: [],
      filteredCheckIn: [],
      filteredContacts: [],
      employees: [],
      meetings: [],
      selectedDepartments: [],
      departmentOptions: [
        {
          allGroup: "All",
          depts: []
        }
      ],
      contactOptions: [
        {
          allGroup: "All",
          emps: []
        }
      ],
      selectedContacts: [],
      OldSelectedContacts: ["null"],
      OldSelectedDepts: []
    };
  },
  watch: {
    fetchedCheckDeptFlag: function() {
      this.updateFilter();
    },
    deptcheckinsize: function() {
      if (this.checkinsize == this.deptcheckinsize) {
        this.fetchedCheckDeptFlag++;
      }
    },
    empsDeptSize: function() {
      if (this.empsDeptSize == this.deptempsize) {
        this.fetchedCheckDeptFlag++;
      }
    },
    selectedDepartments: function() {
      this.updatingFilterFlag = true;
      this.fetchedCheckDeptFlag++;
    },
    selectedContacts: function() {
      if (this.OldSelectedContacts.length != this.selectedContacts.length) {
        this.fetchedCheckDeptFlag++;
        this.OldSelectedContacts = this.selectedContacts;
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    updateFilter() {
      let filteredDepts = this.selectedDepartments.map(x => x.id);
      this.filteredCheckIn = this.checkIn.filter(x =>
        filteredDepts.includes(x.departmentid)
      );
      if (this.empsDeptSize == this.deptempsize) {
        this.contactOptions[0].emps = this.employees.filter(x => {
          return filteredDepts.includes(x.departmentid);
        });
        if (this.OldSelectedDepts.length != this.selectedDepartments.length) {
          this.selectedContacts = this.employees.filter(x =>
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
      let selectedContactsId = this.selectedContacts.map(x => x.id);
      let contactedCheckins = this.filteredCheckIn.filter(x =>
        selectedContactsId.includes(x.employee)
      );
      let contactedCheckinDates = contactedCheckins.map(x =>
        DateTime.fromSeconds(x.checkIn.seconds).toFormat("DD")
      );

      this.filteredCheckIn = this.filteredCheckIn.filter(x =>
        contactedCheckinDates.includes(
          DateTime.fromSeconds(x.checkIn.seconds).toFormat("DD")
        )
      );
      let contactedAllempsId = this.filteredCheckIn.map(x => x.employee);
      this.filteredContacts = this.employees.filter(x =>
        contactedAllempsId.includes(x.id)
      );

      //     this.filteredContacts = this.employees

      //this.filteredCheckIn.forEach(this.checkIn);
      //let filteredContacts = this.employees.filter(x => fil);
    },
    fetchData() {
      database
        .collection("departments")
        .get()
        .then(departments =>
          departments.forEach(department => {
            let departmentRecord = {
              name: department.data().name,
              id: department.id
            };
            this.departmentOptions[0].depts.push(departmentRecord);
            this.selectedDepartments.push(departmentRecord);
          })
        );
      database
        .collection("meetings")
        .get()
        .then(meetings =>
          meetings.forEach(meeting => {
            let meetingRecord = meeting.data();
            this.meetings.push(meetingRecord);
            meetingRecord.employeesids = [];
            meetingRecord.acceptedids = [];

            meeting
              .data()
              .location.get()
              .then(
                location => (meetingRecord.locationName = location.data().name)
              );
            meeting.data().employees.forEach(emp => {
              meetingRecord.employeesids.push(emp.id);
            });

            meeting.data().accepted.forEach(emp => {
              meetingRecord.acceptedids.push(emp.id);
            });
          })
        );
      database
        .collection("checkIn")
        .get()
        .then(checkIns => {
          this.checkinsize = checkIns.size;

          checkIns.forEach(checkIn => {
            let checkInRecord = checkIn.data();
            checkInRecord.id = checkIn.id;

            database
              .collection("employees")
              .doc(checkIn.data().employee)
              .get()
              .then(emp =>
                emp
                  .data()
                  .unit.get()
                  .then(unit => {
                    unit
                      .data()
                      .department.get()
                      .then(department => {
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
        .then(emps => {
          this.deptempsize = emps.size;
          emps.forEach(emp => {
            let empRecord = emp.data();
            empRecord.id = emp.id;
            empRecord.unit.get().then(unit => {
              empRecord.unitname = unit.data().name;
              empRecord.unitid = unit.id;
              unit
                .data()
                .location.get()
                .then(loc => {
                  empRecord.unitLocation = loc.data().name;
                  empRecord.unitLocationid = loc.id;
                });
              unit
                .data()
                .department.get()
                .then(dept => {
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
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
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
  padding: 0;
}
/deep/.multiselect_single {
  width: 10px;
}
.filter-labels {
}
.analytics {
  display: flex;
}
.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80vw;
}

.chart-item {
  width: 35vw;
  height: 40vh;
  border: 1px solid lightgray;
  align-items: center;
}
.break {
  flex-basis: 100%;
  height: 0;
  padding: 2.5vh;
}

.filters {
  width: 20vw;
  justify-content: space-around;
}
.filter-item {
  width: 18vw;
  height: 10vh;
}
.title {
  height: 3vh;
  vertical-align: center;
  margin: 0;
}
.listbox {
  width: 35vw;
  height: 37vh;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>