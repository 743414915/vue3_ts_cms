import { defineStore } from "pinia";
import { accountLoginRequest } from "@/service/login/login";

const useLoginStore = defineStore("login", {
  state: () => ({
    token: "",
    name: "",
    id: "",
  }),
  actions: {
    async loginAccountAction(account: any) {
      const res = await accountLoginRequest(account);
      this.id = res.data.id;
      this.name = res.data.name;
      this.token = res.data.token;
    },
  },
});

export default useLoginStore;
