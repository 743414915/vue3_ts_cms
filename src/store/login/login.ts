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

const useLoginStore = defineStore("login", {
  // 指定state的类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    userInfo: {},
    usersMenus: [],
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 账号登陆，获取基本信息
      const res = await accountLoginRequest(account);
      const id = res.data.id;
      this.token = res.data.token;

      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 获取登录用户详细信息（role权限信息）
      const userInfoRes = await getUserInfoById(id);
      this.userInfo = userInfoRes.data;

      // 根据角色请求用户的权限菜单
      const userMenusRes = await getUserMenusByRoleId(id);
      this.usersMenus = userMenusRes.data;

      // 页面跳转
      router.push("/main");
    },
  },
});

export default useLoginStore;
