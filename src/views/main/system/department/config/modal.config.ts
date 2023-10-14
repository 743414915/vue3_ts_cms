const modalConfig = {
  pageName: "department",
  header: {
    newTitle: "新建部门",
    editTitle: "编辑部门",
  },
  formItems: [
    {
      type: "input",
      formItemBind: {
        prop: "name",
        label: "部门名称",
      },
      componentBind: {
        placeholder: "请输入部门名称",
      },
    },
    {
      type: "select",
      formItemBind: {
        prop: "parentId",
        label: "上级部门",
      },
      componentBind: {
        placeholder: "请选择上级部门",
      },
      options: [],
    },
    {
      type: "input",
      formItemBind: {
        prop: "leader",
        label: "部门领导",
      },
      componentBind: {
        placeholder: "请输入部门领导",
      },
    },
  ],
};

export default modalConfig;
