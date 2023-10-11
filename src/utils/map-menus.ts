import type { RouteRecordRaw } from "vue-router";

function loadLocalRoutes() {
  // 动态添加路由
  const localRoutes: RouteRecordRaw[] = [];
  // 1.读取router/main/中的所有ts文件
  const files: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    {
      eager: true,
    },
  );
  for (const file in files) {
    const module = files[file];
    localRoutes.push(module.default);
  }
  return localRoutes;
}

export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes();

  //根据菜单去匹配用户有权限的路由
  const routes: RouteRecordRaw[] = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url);
      if (route) {
        routes.push(route);
      }
    }
  }
  return routes;
}
