<template>
  <div style="padding:0" v-bind:id="row.item.meetingId + ''">
    <b-form-checkbox
      switch
      :disabled="row.item.isEnded"
      v-model="row.item.status"
      size="lg"
      class="switchStyle"
      @click.native="update(row)"
    ></b-form-checkbox>
    <b-popover
      v-bind:target="row.item.meetingId + ''"
      triggers="hover"
      placement="right"
    >
      <template #title>
        <h3>Attendees</h3>
        <b-list-group>
          <b-list-group-item
            v-for="emp in row.item.employees"
            :key="emp.employeeId"
          >
            <b-avatar :src="emp.avatar" style="float:left; "></b-avatar>
            <div style="float:left; padding:0" class="ml-3">
              <h5 style="padding:0">{{ emp.name }}</h5>
              <b-badge
                pill
                :variant="isAccepted(row, emp) ? `success` : `secondary`"
                >{{ isAccepted(row, emp) ? "Attending" : "Pending" }}</b-badge
              >
            </div>
          </b-list-group-item>
        </b-list-group>
      </template>
    </b-popover>
  </div>
</template>

<script>
import { auth, database } from "../assets/firebase";
export default {
  props: ["row"],
  data() {
    return {
      attendees: []
    };
  },
  created() {
    database
      .collection("employees")
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then(snap =>
        snap.forEach(y => {
          this.curEmpID = y.id;
        })
      );
  },
  methods: {
    isAccepted(row, emp) {
      if (emp.employeeId == this.curEmpID) {
        return row.item.status;
      } else {
        return emp.isAccepted;
      }
    },
    update(row) {
      let updatedEmpolyee = [];
      database
        .collection("employees")
        .where("uid", "==", auth.currentUser.uid)
        .get()
        .then(snap =>
          snap.forEach(y => {
            if (!row.item.status) {
              row.item.accepted = row.item.accepted.filter(x => x != y.id);
              row.item.employees.filter(
                emp => emp.employeeId == y.id
              )[0].isAccepted = false;
            } else {
              if (!row.item.accepted.includes(y.id)) {
                row.item.accepted.push(y.id);
              }
            }
            row.item.accepted.forEach(empId => {
              let empRef = database.doc("/employees/" + empId);
              updatedEmpolyee.push(empRef);
            });

            database
              .collection("meetings")
              .doc(row.item.meetingId)
              .update({
                accepted: updatedEmpolyee
              });
          })
        );
    }
  }
};
</script>

<style scoped>
.switchStyle {
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.badge {
  display: inline-block;
  font-size: 1.5vh;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
