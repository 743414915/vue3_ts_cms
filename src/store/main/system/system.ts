import {
  deleteUserById,
  postUsersListData,
} from "@/service/main/system/system";
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
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo);
      const { totalCount, list } = usersListRes.data;
      this.usersTotalCount = totalCount;
      this.usersList = list;
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id);

      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 });
      return deleteResult;
    },
  },
  getters: {},
});

export default useSystemStore;
