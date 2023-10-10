import type { IAccount } from "@/types";

import { defineStore } from "pinia";
import { accountLoginRequest } from "@/service/login/login";
import { localCache } from "@/utils/cache";

const LOGIN_TOKEN = "login/token";

const useLoginStore = defineStore("login", {
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    name: "",
    id: "",
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 账号登陆，获取基本信息
      const res = await accountLoginRequest(account);
      this.id = res.data.id;
      this.name = res.data.name;
      this.token = res.data.token;

      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);
    },
  },
});

export default useLoginStore;
