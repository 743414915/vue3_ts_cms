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

interface ILoginState {
  token: string;
  userInfo: any;
  usersMenus: any;
}
const USERINFO = "userInfo";
const USERSMENUS = "usersMenus";

const useLoginStore = defineStore("login", {
  // 指定state的类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    userInfo: localCache.getCache(USERINFO) ?? {},
    usersMenus: localCache.getCache(USERSMENUS) ?? [],
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
      const usersMenus = userMenusRes.data;
      this.usersMenus = usersMenus;

      // 本地缓存
      localCache.setCache(USERINFO, userInfo);
      localCache.setCache(USERSMENUS, usersMenus);

      // 页面跳转
      router.push("/main");
    },
  },
});

export default useLoginStore;
