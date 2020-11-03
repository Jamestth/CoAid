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
        <p>{{ row.item.accepted }}</p>
        <p>hiii</p>
      </template>
    </b-popover>
  </div>
</template>

<script>
import { auth, database } from "../assets/firebase";
export default {
  props: ["row"],
  data() {
    return {};
  },
  created() {},
  methods: {
    update(row) {
      let updatedEmpolyee = [];
      database
        .collection("employees")
        .where("uid", "==", auth.currentUser.uid)
        .get()
        .then(snap =>
          snap.forEach(y => {
            console.log(row.item.status);
            if (!row.item.status) {
              row.item.accepted = row.item.accepted.filter(x => x != y.id);
              
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
</style>
