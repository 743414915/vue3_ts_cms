import { getEntireDepartment, getEntireRoles } from "@/service/main/main";
import { defineStore } from "pinia";

interface IMainState {
  entireRoles: any[];
  entireDepartments: any[];
}

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
  }),
  actions: {
    async fetchEntirDataAction() {
      const rolesResult = await getEntireRoles();
      const departmentResult = await getEntireDepartment();

      // 保存数据
      this.entireRoles = rolesResult.data.list;
      this.entireDepartments = departmentResult.data.list;
    },
  },
});

export default useMainStore;
