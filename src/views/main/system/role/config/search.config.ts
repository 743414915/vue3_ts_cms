const searchConfig = {
  formItems: [
    {
      type: "input",
      span: 8,
      prop: "name",
      label: "角色名称",
      initialValue: "",
      bind: {
        placeholder: "请输入查询的角色名称",
      },
    },
    {
      type: "input",
      span: 8,
      prop: "leader",
      label: "权限介绍",
      bind: {
        placeholder: "请输入查询的权限介绍",
      },
    },
    {
      type: "date-picker",
      span: 8,
      prop: "createAt",
      label: "创建时间",
      bind: {
        type: "daterange",
        rangeSeparator: "到",
        startPlaceholder: "开始时间",
        endPlaceholder: "开始时间",
      },
    },
  ],
};

export default searchConfig;
