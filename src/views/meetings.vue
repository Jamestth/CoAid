<template>
  <b-container class="meetingspage">
    <h1>
      My Meetings
      <router-link
        to="/createmeeting"
        tag="button"
        class="btn ml-3"
        style="margin:0"
        >Create meeting</router-link
      >
    </h1>
    <div class="Meetings">
      <b-row class="text-center">
        <b-table striped hover :items="meetingsData" :fields="fields">
          <template v-slot:cell(status)="row">
            <SwitchPopover v-bind:row="row"></SwitchPopover>
          </template>
        </b-table>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { DateTime } from "luxon";
import { database, auth } from "../assets/firebase.js";
import SwitchPopover from "../components/SwitchPopover";
export default {
  components: {
    SwitchPopover
  },
  data() {
    return {
      meetingsData: [],
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true
        },
        {
          key: "location",
          label: "Location",
          sortable: true
        },
        {
          key: "start",
          label: "Start",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "end",
          label: "End",
          sortable: true
        },

        {
          key: "status",
          label: "Status",
          sortable: false
        }
      ]
    };
  },
  methods: {
    fetchData: function() {
      let userID = auth.currentUser.uid;

      database
        .collection("meetings")
        .get()
        .then(snapshot =>
          snapshot.forEach(meetingrecords => {
            let record = {
              meetingId: meetingrecords.id,
              employeeID: [],
              employees: [],
              accepted: [],
              end: DateTime.fromSeconds(
                meetingrecords.data().end.seconds
              ).toFormat(`ff`),
              start: DateTime.fromSeconds(
                meetingrecords.data().start.seconds
              ).toFormat(`ff`),
              name: meetingrecords.data().name,
              location: "",
              status: false,
              isEnded: false
            };
            //accepted meeting
            meetingrecords
              .data()
              .accepted.forEach(x =>
                x.get().then(y => record.accepted.push(y.id))
              );

            meetingrecords
              .data()
              .location.get()
              .then(loc => (record.location = loc.data().name));
            if (meetingrecords.size != 0) {
              meetingrecords.data().employees.forEach(emp => {
                emp.get().then(empdata => {
                  let empRecords = {
                    name: empdata.data().name,
                    avatar: empdata.data().avatar,
                    employeeId: empdata.id,
                    isAccepted: record.accepted.includes(empdata.id)
                  };
                  record.employees.push(empRecords);
                  record.employeeID.push(empdata.id);

                  let endTime = DateTime.fromSeconds(
                    meetingrecords.data().end.seconds
                  );
                  let currentTime = DateTime.local();
                  if (empdata.data().uid == userID) {
                    if (
                      currentTime < endTime &&
                      record.employees.includes(empdata.id)
                    ) {
                      record.status = true;
                    } else if (
                      currentTime >= endTime
                      //record.employees.includes(empdata.id)
                    ) {
                      record.isEnded = true;
                    }
                    this.meetingsData.push(record);
                  }
                });
              });
            }
          })
        );
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@500");
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@500");


h1 {
  font-family: "DM Sans", sans-serif !important;
  padding: 15px;
  font-size: 30px;
  text-align: center;
}
div {
  /*font-family: omnes-pro;*/
  text-align: center;
  padding: 15px;
}
.multiselect {
  width: 300px;
  border-color: black;
  font-size: 15px;
}
.multiselect__tags {
  min-height: 40px;
  border: 1px solid #767676;
  display: block;
  padding: 0px 40px 0 5px;
  border-radius: 5px;
  background: #fff;
}
.multiselect,
.multiselect_input,
.multiselect_single {
  font-family: inherit;
  font-size: 15px;
  padding: 15px;
  text-align: left;
  margin: auto;
}
.multiselect_single {
  width: 10px;
}
.btn {
  background-color: darkblue;
  text-align: center;
  color: white;
  padding: 10px;
  border-color: white;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
  width: 100px;
  border-radius: 8px;
}
.btn:hover {
  background-color: white;
  border-color: darkblue;
  color: darkblue;
}

label {
  margin: 10px;
}
/deep/ .table th {
  color: #fff;
  background-color: darkblue !important;
}
</style>
