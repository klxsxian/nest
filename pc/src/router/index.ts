import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import { routesGen } from "./gen";

const routes: Array<RouteRecordRaw> = [
  ...routesGen,
  // {
  //   path: "",
  //   redirect: "/index",
  // },
  // {
  //   path: "/index",
  //   name: "主页",
  //   component: () => import("@/views/Index.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  console.log("beforeEach", to, from);
  return true;
});

export default router;
