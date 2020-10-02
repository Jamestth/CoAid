import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/analytics",
        name: "Analytics",
        component: () => import ("../views/analytics.vue")
    },
    {
        path: "/checkinout",
        name: "Checkinout",
        component: () => import ("../views/checkinout.vue")
    },
    {
        path: "/meetings",
        name: "Meetings",
        component: () => import ("../views/meetings.vue")
    }, {
        path: "/schedule",
        name: "Schedule",
        component: () => import ("../views/schedule.vue")
    }
];

const router = new VueRouter({mode: "history", base: process.env.BASE_URL, routes});

export default router;
