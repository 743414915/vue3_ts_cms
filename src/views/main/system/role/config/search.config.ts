const searchConfig = {
  pageName: "role",
  formItems: [
    {
      type: "input",
      span: 8,
      initialValue: "",
      formItemBind: {
        prop: "name",
        label: "角色名称",
      },
      componentBind: {
        placeholder: "请输入查询的角色名称",
      },
    },
    {
      type: "input",
      span: 8,
      formItemBind: {
        prop: "leader",
        label: "权限介绍",
      },
      componentBind: {
        placeholder: "请输入查询的权限介绍",
      },
    },
    {
      type: "date-picker",
      span: 8,
      formItemBind: {
        prop: "createAt",
        label: "创建时间",
      },
      componentBind: {
        type: "daterange",
        rangeSeparator: "到",
        startPlaceholder: "开始时间",
        endPlaceholder: "开始时间",
      },
    },
  ],
};

export default searchConfig;
