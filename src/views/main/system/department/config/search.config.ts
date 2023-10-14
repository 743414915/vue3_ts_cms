const searchConfig = {
  formItems: [
    {
      type: "input",
      span: 8,
      initialValue: "",
      formItemBind: {
        prop: "name",
        label: "部门名称",
      },
      componentBind: {
        placeholder: "请输入查询的部门名称",
      },
    },
    {
      type: "input",
      span: 8,
      formItemBind: {
        prop: "leader",
        label: "部门领导",
      },
      componentBind: {
        placeholder: "请输入查询的领导名称",
      },
    },
    {
      type: "select",
      span: 8,
      formItemBind: {
        prop: "enable",
        label: "状态",
      },
      componentBind: {
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
