<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="(contact, id) in contactedList" v-bind:key="id">
        <div
          class="pl-5 pr-5"
          style="display:flex;  justify-content:space-between"
        >
          <b-avatar :src="contact.avatar"></b-avatar>
          <div
            style="display:flex; justify-content: center; flex-direction:column;width:5vw"
          >
            <p>{{ contact.name }}</p>
          </div>
          <div
            style="display:flex; justify-content: center; flex-direction:column; width:5vw"
          >
            <p>{{ contact.phone }}</p>
          </div>
          <div
            style="display:flex; justify-content: center; flex-direction:column;"
          >
            <b-link
              variant="primary"
              v-bind:to="'/profile/' + contact.id + '/' + false"
            >
              <p>View Profile</p>
            </b-link>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      contactedList: null
    };
  },
  mounted() {
    this.contactedList = this.$props.data.map(x => {
      return {
        id: x.id,
        name: x.name,
        avatar: x.avatar,
        department: x.department,
        email: x.email,
        phone: x.phone,
        location: x.unitLocation,
        unit: x.unitid
      };
    });
  }
};
</script>

<style scoped>
.list-group-item {
  padding: 0;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}

p {
  margin: 0;
  font-size: 1vw;
}
.scrollable {
  height: 30vh;
  width: inherit;
  overflow: scroll;
}
</style>