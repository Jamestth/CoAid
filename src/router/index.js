import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "../assets/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("../views/analytics.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/checkinout",
    name: "Checkinout",
    component: () => import("../views/checkinout.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: () => import("../views/meetings.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/loginsignup",
    name: "loginsignup",
    component: () => import("../views/loginsignup.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/signup.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: () => import("../views/schedule.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/checkinsuccess",
    name: "Checkinsuccess",
    component: () => import("../views/checkinsuccess.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/healthdeclaration",
    name: "healthdeclaration",
    component: () => import("../views/healthdeclaration.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/checkoutsuccess",
    name: "Checkoutsuccess",
    component: () => import("../views/checkoutsuccess.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/profile/:id/:personal",
    name: "Profile",
    component: () => import("../views/profile.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/createmeeting",
    name: "Createmeeting",
    component: () => import("../views/createmeeting.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/meetingsuccess",
    name: "Meetingsuccess",
    component: () => import("../views/meetingsuccess.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isLoggedIn = auth.currentUser;
  //isLoggedIn = true; // remove when auth is done
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (isLoggedIn && to.path === "/login") {
    next("/");
  } /*else if (isLoggedIn && from.path === "/login") {
    console.log("do nothing");
  } */
  else {
    next();
  }
});

export default router;
