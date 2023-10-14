import hyRequest from "@/service";

/**
 * 获取用户列表数据
 * @param queryInfo 查询的条件
 */
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo,
  });
}

/**
 * 根据用户id删除数据
 * @param id 用户id
 */
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`,
  });
}

/**
 * 创建用户
 * @param userInfo 新建的用户信息
 */
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: `/users`,
    data: userInfo,
  });
}

/**
 * 修改用户信息
 * @param userInfo 修改的用户信息
 */
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
  });
}

/**
 * 针对页面的网络请求：查
 * @param pageName url的前缀
 * @param queryInfo 查询条件
 * @returns
 */
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
  });
}

/**
 * 针对页面的网络请求：删
 * @param pageName url的前缀
 * @param id 数据id
 * @returns
 */
export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
  });
}

/**
 * 针对页面的网络请求：增
 * @param pageName url的前缀
 * @param pageInfo 新建的数据
 * @returns
 */
export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo,
  });
}

/**
 * 针对页面的网络请求：改
 * @param pageName url的前缀
 * @param pageInfo 新建的数据
 * @returns
 */
export function editPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo,
  });
}
