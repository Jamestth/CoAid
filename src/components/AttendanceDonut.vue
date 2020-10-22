<template>
  <vc-donut
    background="white"
    foreground="#dee2e6"
    unit="vh"
    size= 10
    :thickness="10"
    :sections="sections"
    :total="100"
    :start-angle="0"
    :auto-adjust-text-size="true"
    @section-click="handleSectionClick"
  >
    <h1>{{sections[0].number}}</h1>
  </vc-donut>
</template>
<script>
export default {
  props:["sections"],
  data() {
    return {

    };
  },
  methods: {
    handleSectionClick(section, event) {
      console.log(event)
      console.log(`${section.label} clicked.`);
    },
  },
};
</script>
<style scoped>
h1 {
  margin: 0;
  font-size: 3vh;
}
</style>
