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
