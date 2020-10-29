import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("../views/analytics.vue"),
  },
  {
    path: "/checkinout",
    name: "Checkinout",
    component: () => import("../views/checkinout.vue"),
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: () => import("../views/meetings.vue"),
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: () => import("../views/schedule.vue"),
  },
  {
    path: "/checkinsuccess",
    name: "Checkinsuccess",
    component: () => import("../views/checkinsuccess.vue"),
  },
  {
    path: "/healthdeclaration",
    name: "healthdeclaration",
    component: () => import("../views/healthdeclaration.vue"),
  },
  {
    path: "/checkoutsuccess",
    name: "Checkoutsuccess",
    component: () => import("../views/checkoutsuccess.vue"),
  },
  {
    path: "/profile/:id/:personal",
    name: "Profile",
    component: () => import("../views/profile.vue"),
    props: true
  },
  {
    path: "/createmeeting",
    name: "Createmeeting",
    component: () => import("../views/createmeeting.vue"),
  },
  {
    path: "/meetingsuccess",
    name: "Meetingsuccess",
    component: () => import("../views/meetingsuccess.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
