import { ref } from "vue";
import type PageModal from "@/components/page-modal/page-modal.vue";

type CallbackFnType = (data?: any) => void;
function usePageModal(
  newCallback?: CallbackFnType,
  EditCallback?: CallbackFnType,
) {
  const modalRef = ref<InstanceType<typeof PageModal>>();
  // 点击了新增
  function handleNewBtnClick() {
    modalRef.value?.setModal();
    newCallback && newCallback();
  }
  // 点击了编辑
  function handleEditBtnClick(itemData: any) {
    modalRef.value?.setModal(false, itemData);
    EditCallback && EditCallback(itemData);
  }
  return {
    modalRef,
    handleNewBtnClick,
    handleEditBtnClick,
  };
}

export default usePageModal;
