import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Settings from "../views/SettingsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
