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
        <b-avatar :src="row.item.avatar" size="2rem"></b-avatar>
        {{ row.item.name }}
        <b-button
          variant="primary"
          class="float-right"
          v-bind:to="'/profile/' + row.item.eid + '/' + false"
        >
          View Profile
        </b-button>
      </template>

      <b-row v-for="(value, key) in row.item" v-bind:key="key">
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
export default {
  props: ["row"],
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
