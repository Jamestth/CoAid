import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import Donut from "vue-css-donut-chart";
import "vue-css-donut-chart/dist/vcdonut.css";
import Vuex from "vuex";

Vue.use(Donut);
Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    userId: 1234,
    checkedIn: true,
  },
  mutations: {
    negateCheck(state) {
      state.checkedIn = !state.checkedIn;
    },
  },
  actions: {
    updateCheck(context) {
      console.log("hi")
      context.commit("negateCheck");
    },
  },
  getters: {
    getUser: (state) => {
      return state.userId;
    },
    getCheckIn: (state) => {
      return state.checkedIn;
    }
  },
  methods :{
    check(){
      
    }
  }
});

new Vue({
  router,
  render: (h) => h(App),
  store: store,
}).$mount("#app");
