import {
  getEntireDepartment,
  getEntireMenus,
  getEntireRoles,
} from "@/service/main/main";
import { defineStore } from "pinia";

interface IMainState {
  entireRoles: any[];
  entireDepartments: any[];
  entireMenus: any[];
}

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],
  }),
  actions: {
    async fetchEntirDataAction() {
      const rolesResult = await getEntireRoles();
      const departmentsResult = await getEntireDepartment();
      const menuResults = await getEntireMenus();

      // 保存数据
      this.entireRoles = rolesResult.data.list;
      this.entireDepartments = departmentsResult.data.list;
      this.entireMenus = menuResults.data.list;
    },
  },
});

export default useMainStore;
