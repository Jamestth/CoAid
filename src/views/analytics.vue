<template>
  <div class="analytics pt-5">
    <div class="charts">
      <div class="chart-item">
        <Barchart
          :data="filteredCheckIn"
          :key="fetchedCheckDeptFlag"
        ></Barchart>
      </div>
      <div class="chart-item">
        <Barchart
          :data="filteredCheckIn"
          :key="fetchedCheckDeptFlag"
        ></Barchart>
      </div>
      <div class="break"></div>
      <div class="chart-item">
        <Barchart
          :data="filteredCheckIn"
          :key="fetchedCheckDeptFlag"
        ></Barchart>
      </div>
      <div class="chart-item">
        <Barchart
          :data="filteredCheckIn"
          :key="fetchedCheckDeptFlag"
        ></Barchart>
      </div>
    </div>
    <div class="filters">
      <div class="filter-item">
        <label class="typo__label">Department</label>
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
        ></multiselect>
      </div>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import { database } from "./../assets/firebase";
import Multiselect from "vue-multiselect";
import Barchart from "./../components/StatusBar.vue";
export default {
  components: { Barchart, Multiselect },
  data() {
    return {
      fetchedCheckDeptFlag: 0,
      checkinsize: null,
      deptcheckinsize: 0,
      checkIn: [],
      filteredCheckIn: [],
      employees: [],
      meetings: [],
      selectedDepartments: [],
      departmentOptions: [
        {
          allGroup: "All",
          depts: []
        }
      ]
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
    selectedDepartments: function() {
      this.fetchedCheckDeptFlag++;
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
                });
            });
            this.employees.push(empRecord);
          });
        });
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
/deep/.multiselect {
  width: 100px;
  border-color: #767676;
  font-size: 15px;
  width: 15vw;
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
  border: 3px solid black;
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
  width: 15vw;
  height: 10vh;
  background-color: antiquewhite;
}
</style>