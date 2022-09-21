import { createWebHistory, createRouter } from "vue-router";
import Home from "Views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/notes",
    redirect: { name: "Home" },
  },
  {
    path: "/notes/create",
    name: "NoteCreate",
    component: () => import("Views/Note.vue"),
  },
  {
    path: "/notes/:id",
    name: "Note",
    component: () => import("Views/Note.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("Views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
