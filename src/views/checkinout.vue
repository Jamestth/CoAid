<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="8">
      <b-row>
        <b-col>
          <b-row class="d-flex justify-content-center">
            <img src="../assets/checkin.jpg" style="width:20vw" />
          </b-row>
          <b-row class="d-flex justify-content-center">
            <router-link
              to="/healthdeclaration"
              tag="button"
              class="btn ml-3"
              style="margin:0"
            >
              Check In
            </router-link>
          </b-row>
        </b-col>
        <b-col>
          <b-row class="d-flex justify-content-center">
            <img src="../assets/checkout.jpg" style="width:20vw" />
          </b-row>
          <b-row class="d-flex justify-content-center">
            <router-link
              to="/checkoutsuccess"
              tag="button"
              class="btn ml-3"
              style="margin:0"
            >
              Check Out
            </router-link>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
div {
  text-align: left;
  padding: 15px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.btn {
  background-color: darkblue;
  text-align: center;
  color: white;
  padding: 10px;
  border-color: white;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 8px;
}
.btn:hover {
  background-color: white;
  border-color: darkblue;
  color: darkblue;
}
</style>