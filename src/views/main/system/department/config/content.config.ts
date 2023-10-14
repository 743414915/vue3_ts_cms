const contentConfig = {
  pageName: "department",
  header: {
    title: "部门列表",
    btnTitle: "新建部门",
  },
  propsList: [
    // selection选择
    { type: "selection", label: "选择", width: "80px", align: "center" },
    // index索引
    { type: "index", label: "序号", width: "80px", align: "center" },

    {
      type: "normal",
      label: "部门名称",
      prop: "name",
      width: "150px",
      align: "center",
    },
    {
      type: "normal",
      label: "部门领导",
      prop: "leader",
      width: "150px",
      align: "center",
    },
    {
      type: "normal",
      label: "上级部门",
      prop: "parentId",
      width: "150px",
      align: "center",
    },

    {
      type: "timer",
      label: "创建时间",
      prop: "createAt",
      align: "center",
    },
    {
      type: "timer",
      label: "更新时间",
      prop: "updateAt",
      align: "center",
    },

    {
      type: "handler",
      label: "操作",
      align: "center",
      width: "160px",
    },
  ],
};

export default contentConfig;
