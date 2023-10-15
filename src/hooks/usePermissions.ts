import useLoginStore from "@/store/login/login";

function usePermission(permissionId: string) {
  // 获取当前用户增删改查的权限
  const loginStore = useLoginStore();
  const { permissions } = loginStore;

  return !!permissions.find((item) => {
    return item.includes(permissionId);
  });
}
export default usePermission;
