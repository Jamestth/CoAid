<template>
  <div>
    <b-badge :variant="row.item.statusType" v-bind:id="row.item.eid + ''">
      {{ row.item.status }}</b-badge
    >
    <b-popover
      v-bind:target="row.item.eid + ''"
      triggers="hover"
      placement="right"
    >
      <template #title>
        <b-avatar
          style="border-style: solid;"
          class="align-center"
          :src="row.item.avatar"
          size="4rem"
        ></b-avatar>
        <div style="float:right;">
          <h4>{{ row.item.name }}</h4>
          <b-link
            variant="primary"
            v-bind:to="'/profile/' + row.item.eid + '/' + false"
          >
            View Profile
          </b-link>
        </div>
      </template>

      <b-row v-for="(value, key) in infoList" v-bind:key="key">
        <b-col
          ><p>{{ key.toUpperCase() }}:</p></b-col
        >
        <b-col
          ><p style="font-weight:bold">{{ value }}</p></b-col
        >
      </b-row>
    </b-popover>
  </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
  props: ["row"],
  data() {
    return {
      avatar: this.$props.row.item.avatar,
      status: this.statusType,
      infoList: {
        Phone: this.$props.row.item.phone,
        Department: this.$props.row.item.department,
        Office: this.$props.row.item.office,
        Unit: this.$props.row.item.unit,
        "Last checked in at": this.formatTime(
          this.$props.row.item.lastCheck.checkIn
        ),
        "Last checked out at": this.formatTime(
          this.$props.row.item.lastCheck.checkOut
        ),
      },
    };
  },
  created() {
  },
  methods: {
    formatTime(timestamp) {
      if (timestamp) {
        return DateTime.fromSeconds(timestamp.seconds).toFormat(`ff`);
      }
      return "";
    },
  },
};
</script>

<style scoped>
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
