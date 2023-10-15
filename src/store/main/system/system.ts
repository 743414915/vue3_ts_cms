import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData,
} from "@/service/main/system/system";
import { defineStore } from "pinia";
import useMainStore from "../main";

interface ISystemState {
  usersList: any[];
  usersTotalCount: number;
  pageList: any[];
  pageTotalCount: number;
}
const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0,
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
    async newUserDataAction(userInfo: any) {
      // 创建新用户
      const newResult = await newUserData(userInfo);

      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 });

      // 获取最新数据
      const mainStore = useMainStore();
      mainStore.fetchEntirDataAction();

      return newResult;
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 修改用户信息
      const editResult = await editUserData(id, userInfo);

      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 });

      // 获取最新数据
      const mainStore = useMainStore();
      mainStore.fetchEntirDataAction();

      return editResult;
    },

    /**
     * 针对页面的数据进行查询操作
     * @param pageName url
     * @param queryInfo 查询条件
     */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo);
      const { totalCount, list } = pageListResult.data;

      this.pageList = list;
      this.pageTotalCount = totalCount;
    },

    /**
     * 针对页面的数据id进行删除操作
     * @param pageName url
     * @param id 数据的id
     */
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id);

      // 重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 });

      // 保存最新数据
      const mainStore = useMainStore();
      mainStore.fetchEntirDataAction();

      return deleteResult;
    },

    /**
     * 针对页面的数据进行新建操作
     * @param pageName url
     * @param pageInfo 新建的数据
     */
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo);

      // 重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 });

      // 保存最新数据
      const mainStore = useMainStore();
      mainStore.fetchEntirDataAction();

      return newResult;
    },

    /**
     * 针对页面的数据进行修改操作
     * @param pageName url
     * @param pageInfo 修改的数据
     */
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo);

      // 重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 });

      // 保存最新数据
      const mainStore = useMainStore();
      mainStore.fetchEntirDataAction();

      return editResult;
    },
  },
  getters: {},
});

export default useSystemStore;
