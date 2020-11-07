<template>
  <b-container class="meetingspage">
    <h1>
      Create a Meeting
      <router-link to="/meetings" tag="button" class="btn ml-3 cusbtn" style="margin:0"
        >Back to meetings</router-link
      >
    </h1>
    <div class="Meetings">
      <b-container fluid>
        <b-row>
        <b-col>
        </b-col>
        <b-col cols = 8>
                  <b-row>
          <b-col> Meeting Title: </b-col>
          <b-col
            ><input type="text" id="name" name="name" v-model="name"
          /></b-col>
        </b-row>
        <b-row>
          <b-col> Date: </b-col>
          <b-col
            ><input type="date" id="meetingdate" name="meetingdate" v-model="selectedDate"
          /></b-col>
        </b-row>
        <b-row>
          <b-col> Start Time: </b-col>
          <b-col ><input type="time" id="meetingtime" name="meetingtime" v-model="selectedStartTime"/>
    <div class = "pt-2" style="padding:0">
      <b-button
        size="sm"
        variant="outline-danger"
        class = "clearbtn mr-2"
        v-if="selectedStartTime"
        @click="clearTime"
      >
        Clear
      </b-button>
      <b-button
        size="sm"
        class="ml-auto setnowbtn"
        style="padding:10"
     
        variant="outline-primary"
        @click="setNow"
      >
        Set Now
      </b-button>
    </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col> Duration (Minutes): </b-col>
          <b-col
            >                <multiselect
            select-label=""
                track-by="name"
                label="name"
                v-model="duration"
                :options="durationList"
                required
                      :show-labels="false"
                >duration</multiselect
              >
  </b-col>
        </b-row>
        <b-row>
          <b-col>Locations: </b-col>
          <b-col>              
            <multiselect
                        select-label=""
                track-by="name"
                label="name"
                v-model="selectedLoc"
                :options="locations"
                      :show-labels="false"
                >Locations</multiselect
              >
          </b-col>
        </b-row>
        <b-row>
          <b-col>Select Employees Involved (Excluding yourself): </b-col>
          <b-col
            ><p class="test">
              <multiselect
                select-label=""
      :show-labels="false"
                :limit="4"
                track-by="name"
                label="name"
                v-model="selectedEmp"
                :options="employees"
                :close-on-select="false"
                multiple
                >Employees Involved</multiselect
              >
            </p></b-col
          >
        </b-row>  
        </b-col>
        <b-col></b-col>
        </b-row>
        
      </b-container>
    </div>
        <b-row>
          <b-col> </b-col>
          <b-col>
            <div class="d-flex justify-content-center">            
              <b-button class="cusbtn align-self-center" style="float:center" @click="checkfill()" >Submit</b-button>
            </div>

          </b-col>
          <b-col></b-col>
        </b-row>

      

    <b-modal ref="modal" title="Meeting Agreement">
      <p class="para">By creating this meeting, I agree: <br><br>
              <ul>
              <li> To verify all participants are health status 'Healthy' for the past 14 days </li><br>
              <li> Meeting duration is not to exceed 60 minutes </li><br>
              <li> Participants must disinfect meeting locations after use
              </li></ul>
              </p><br><br>
          <b-form>
            <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              :value="true"
              :unchecked-value="false"
              v-model="checked"
              style="float:right"
              switch
            >
            <p><strong>
              I acknowledge to all of the above</strong></p> </b-form-checkbox
            >

          </b-form>

           <template #modal-footer>
        <div class="w-100">
        <b-button class="cusbtn"  style="float:right" @click="submit">submit</b-button>
        </div>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import Multiselect from "vue-multiselect";
import {auth, firebase, database } from "../assets/firebase";
import { DateTime } from "luxon";
export default {
  components: { Multiselect },
  data() {
    return {
      curEmpId:null,
      checked: false,
      selectedDate: null,
      selectedStartTime: null,
      selectedEmp: null,
      selectedLoc: null,
      employees: [],
      locations: [],
      duration: null,
      name:null,
      durationList: [
        { name: "15 Minutes", value: "15" },
        { name: "30 Minutes", value: "30" },
        { name: "45 Minutes", value: "45" },
        { name: "60 Minutes", value: "60" }
      ]
    };
  },


  created() {
    this.fetchdata();
    const now = new Date();
    this.selectedDate = now.toISOString().split('T')[0];
    this.selectedStartTime = now.toTimeString().slice(0, 5);
  },

  methods: {  
    checkfill() {
      if((this.selectedDate && this.selectedStartTime && this.duration && this.selectedEmp && this.selectedLoc) !=null ){
     this.$refs['modal'].show()
      } else {
        alert("Please Fill up all fields.")
      }
  },
    setNow() {
      const now = new Date();
      // Grab the HH:mm part of the time string
      this.selectedStartTime = now.toTimeString().slice(0, 5);
    },
    clearTime() {
      this.selectedStartTime = "";
    },
    submit() {
      if (this.checked) {
        DateTime;
        let datapart = this.selectedDate.split("-");
        let timepart = this.selectedStartTime.split(":");
        let curSelectedDateTime = DateTime.fromObject({
          year: datapart[0],
          month: datapart[1],
          day: datapart[2],
          hour: timepart[0],
          minutes: timepart[1]
        });

        let curEndDatetime = curSelectedDateTime.plus({minutes: this.duration.value})
        let empRefs = []
        let curAccepted = []
        let curEmpRef = database.doc("/employees/" +this.curEmpId);
  
        curAccepted.push(curEmpRef)
        empRefs.push(curEmpRef)
        this.selectedEmp.forEach(emp => {
           let empRef = database.doc("/employees/" + emp.eid);
            empRefs.push(empRef)

        })
        let locRef = database.doc("/locations/" + this.selectedLoc.id);

        let meetingRecord = {
          accepted: curAccepted,
          employees: empRefs,
          end: firebase.firestore.Timestamp.fromMillis(curEndDatetime.toMillis()),
          start: firebase.firestore.Timestamp.fromMillis(curSelectedDateTime.toMillis()),
          location: locRef,
          name: this.name
        }
        database.collection("meetings").add(meetingRecord).then(
                            this.$router
                    .push({ path: "/meetingsuccess" })
                    .catch(error => error)
                
        )


      } else {
        alert("Please acknowledge the Meeting Agreement.");
      }
    },
    fetchdata() {
      let userId = auth.currentUser.uid
      database
        .collection("employees")
        .get()
        .then(emps =>
          emps.forEach(emp => {
            let empRecord = {
              name: emp.data().name,
              eid: emp.id
            };
            if (emp.data().uid != userId) {
            this.employees.push(empRecord);
            } else {
              this.curEmpId = emp.id;
            }

          })
        );
      database
        .collection("locations")
        .get()
        .then(locs =>
          locs.forEach(loc => {
            let locRecord = {
              name: loc.data().name,
              id: loc.id
            };
            this.locations.push(locRecord);
          })
        );
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@500");
h1 {
  /*font-family: "DM Sans", sans-serif !important; */
  padding: 15px;
  font-size: 30px;
  text-align: center;
}
div {
  /*font-family: omnes-pro;*/
  text-align: left;
  padding-bottom: 1.5vh;
}
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
input {
  width: 15vw;
}
.setnowbtn {
  background-color: darkblue;
  color: white;
  padding: 5px;
  width: 70px;
  border-radius: 8px;
}
.setnowbtn:hover {
  background-color: white;
  border-color: darkblue;
  color: darkblue;
}
.clearbtn {
  background-color: darkred;
  color: white;
  padding: 5px;
  width: 70px;
  border-radius: 8px;
}
.clearbtn:hover {
  background-color: white;
  border-color: darkred;
  color: darkred;
}
.cusbtn {
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
.cusbtn:hover {
  background-color: white;
  border-color: darkblue;
  color: darkblue;
}

.div {
  background-color: #ffffff;
  color: black;
  border-color: black;
  text-align: left;
}
.dropbtn {
  background-color: white;
  border-color: black;
  color: black;
  padding: 0px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

label {
  margin: 0px;
}
</style>
