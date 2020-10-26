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
  },
  mutations: {},
  actions: {},
  getters: {
    getUser: (state) => {
      return state.userId;
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
  store: store,
}).$mount("#app");
