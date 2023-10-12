import hyRequest from "@/service";

//根据账号进行登录
export function postUsersListData() {
  return hyRequest.post({
    url: "/users/list",
    data: {
      offset: 0,
      size: 10,
    },
  });
}
