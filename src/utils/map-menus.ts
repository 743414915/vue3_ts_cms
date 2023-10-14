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

// 获取第一个菜单项
export let firstMenu: any = null;
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes();

  //根据菜单去匹配用户有权限的路由
  const routes: RouteRecordRaw[] = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url);
      if (route) {
        // if (routes.find((item) => item.path === menu.url)) {
        //   routes.push({ path: menu.url, redirect: route });
        // }

        routes.push(route);
      }
      if (!firstMenu && route) {
        firstMenu = submenu;
      }
    }
  }
  return routes;
}

/**
 * 根据路径去匹配对应的菜单
 * @param path 匹配的路经
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu;
      }
    }
  }
  return undefined;
}

interface IBreadcrumbs {
  name: string;
  path: string;
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 定义面包屑
  const breadcrumbs: IBreadcrumbs[] = [];

  // 遍历面包屑的层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.children[0].url });
        breadcrumbs.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return breadcrumbs;
}

/**
 * 根据菜单项去映射下面所有层级的id
 * @param menulist 菜单项
 */
export function mapMenuListToids(menulist: any[]) {
  const ids: number[] = [];

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children);
      } else {
        ids.push(item.id);
      }
    }
  }
  recurseGetId(menulist);

  return ids;
}
