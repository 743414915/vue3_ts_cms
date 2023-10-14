const modalConfig = {
  pageName: "role",
  header: {
    newTitle: "新建角色",
    editTitle: "编辑角色",
  },
  formItems: [
    {
      type: "input",
      span: 8,
      formItemBind: {
        prop: "name",
        label: "角色名称",
      },
      componentBind: {
        placeholder: "请输入角色名称",
      },
    },
    {
      type: "input",
      span: 8,
      formItemBind: {
        prop: "intro",
        label: "权限介绍",
      },
      componentBind: {
        placeholder: "请输入权限介绍",
      },
    },
  ],
};

export default modalConfig;
