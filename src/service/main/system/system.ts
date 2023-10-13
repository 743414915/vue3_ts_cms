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
    url: `/users/list/${id}`,
  });
}
