import type { IAccount } from "@/types";

import { defineStore } from "pinia";
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId,
} from "@/service/login/login";
import { localCache } from "@/utils/cache";
import router from "@/router";
import { LOGIN_TOKEN } from "@/global/constants";
import type { RouteRecordRaw } from "vue-router";
import { mapMenuListToPermissins, mapMenusToRoutes } from "@/utils/map-menus";
import useMainStore from "../main/main";

interface ILoginState {
  token: string;
  userInfo: any;
  usersMenus: any;
  permissions: string[];
}
const USERINFO = "userInfo";
const USERSMENUS = "usersMenus";

const useLoginStore = defineStore("login", {
  // 指定state的类型
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    usersMenus: [],
    permissions: [],
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 账号登陆，获取基本信息
      const res = await accountLoginRequest(account);
      const id = res.data.id;
      this.token = res.data.token;
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 获取登录用户详细信息（role权限信息）
      const userInfoRes = await getUserInfoById(id);
      const userInfo = userInfoRes.data;
      this.userInfo = userInfo;

      // 根据角色请求用户的权限菜单
      const userMenusRes = await getUserMenusByRoleId(id);
      const userMenus = userMenusRes.data;
      this.usersMenus = userMenus;

      // 本地缓存
      localCache.setCache(USERINFO, userInfo);
      localCache.setCache(USERSMENUS, userMenus);

      // 请求所有roles/departments的数据
      const mainStore = useMainStore();
      mainStore.fetchEntirDataAction();

      // 获取登陆用户的所有按钮的权限
      const permissions: string[] = mapMenuListToPermissins(userMenus);
      this.permissions = permissions;

      // 动态添加路由
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => router.addRoute("main", route));

      // 页面跳转
      router.push("/main");
    },

    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN);
      const userInfo = localCache.getCache(USERINFO);
      const usersMenus = localCache.getCache(USERSMENUS);

      if (token && userInfo && usersMenus) {
        this.token = token;
        this.userInfo = userInfo;
        this.usersMenus = usersMenus;

        // 请求所有roles/departments的数据
        const mainStore = useMainStore();
        mainStore.fetchEntirDataAction();

        // 获取登陆用户的所有按钮的权限
        const permissions: string[] = mapMenuListToPermissins(usersMenus);
        this.permissions = permissions;

        // 动态添加路由
        // 动态添加路由
        const routes = mapMenusToRoutes(usersMenus);
        routes.forEach((route) => router.addRoute("main", route));
      }
    },
  },
});

export default useLoginStore;
