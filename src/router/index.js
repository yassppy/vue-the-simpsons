import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SimpsonsView from "../views/SimpsonsView.vue";
import SimpsonsDetailView from "../views/SimpsonsDetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/simpsons",
    name: "simpsons",
    component: SimpsonsView,
  },
  {
    path: "/simpsons/:id",
    name: "simpsons-detail",
    component: SimpsonsDetailView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
