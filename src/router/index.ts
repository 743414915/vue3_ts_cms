import { LOGIN_TOKEN } from "@/global/constants";
import { localCache } from "@/utils/cache";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系
  routes: [
    { path: "/", redirect: "/main" },
    {
      path: "/login",
      component: () => import("@/views/login"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/not-found"),
    },
  ],
});

// 导航首位
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN);
  if (to.path === "/main" && !token) {
    // 登陆不成功
    return "/login";
  }
});

export default router;
