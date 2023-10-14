import { ref } from "vue";
import type PageModal from "@/components/page-modal/page-modal.vue";

type callback = (data: any) => void;
function usePageModal(callback?: callback) {
  const modalRef = ref<InstanceType<typeof PageModal>>();
  // 点击了新增
  function handleNewBtnClick() {
    modalRef.value?.setModal();
  }
  // 点击了编辑
  function handleEditBtnClick(itemData: any) {
    modalRef.value?.setModal(false, itemData);
    callback && callback(itemData);
  }
  return {
    modalRef,
    handleNewBtnClick,
    handleEditBtnClick,
  };
}

export default usePageModal;
