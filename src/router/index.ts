import { LOGIN_TOKEN } from "@/global/constants";
import { localCache } from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系
  routes: [
    { path: "/", redirect: "/main/system/user" },
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
  if (to.path.startsWith("/main") && !token) {
    // 登陆不成功
    return "/login";
  }

  // 如果是进入到main页面
  if (to.path === "/main") {
    return firstMenu?.url;
  }
});

export default router;
