import { createWebHistory, createRouter } from "vue-router";
import Home from "Views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    path: "/todosher/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todosher/history",
    name: "History",
    component: () => import("Views/History.vue"),
  },
  {
    path: "/todosher/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("Views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
