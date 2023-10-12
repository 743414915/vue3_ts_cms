import { postUsersListData } from "@/service/main/system/system";
import { defineStore } from "pinia";

interface ISystemState {
  usersList: any[];
  usersTotalCount: number;
}
const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
  }),
  actions: {
    async postUsersListAction() {
      const usersListRes = await postUsersListData();
      const { totalCount, list } = usersListRes.data;
      this.usersTotalCount = totalCount;
      this.usersList = list;
    },
  },
  getters: {},
});

export default useSystemStore;
