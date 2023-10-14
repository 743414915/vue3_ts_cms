const searchConfig = {
  formItems: [
    {
      type: "input",
      span: 8,
      prop: "name",
      label: "部门名称",
      initialValue: "",
      bind: {
        placeholder: "请输入查询的部门名称",
      },
    },
    {
      type: "input",
      span: 8,
      prop: "leader",
      label: "部门领导",
      bind: {
        placeholder: "请输入查询的领导名称",
      },
    },
    {
      type: "select",
      span: 8,
      prop: "enable",
      label: "状态",
      bind: {
        placeholder: "请输入查询的领导名称",
      },
      options: [
        { label: "启动", value: 1 },
        { label: "禁用", value: 0 },
      ],
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
