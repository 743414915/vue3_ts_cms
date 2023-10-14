import { ref } from "vue";
import type PageModal from "@/components/page-modal/page-modal.vue";

function usePageModal() {
  const modalRef = ref<InstanceType<typeof PageModal>>();
  // 点击了新增
  function handleNewBtnClick() {
    modalRef.value?.setModal();
  }
  // 点击了编辑
  function handleEditBtnClick(itemData: any) {
    modalRef.value?.setModal(false, itemData);
  }
  return {
    modalRef,
    handleNewBtnClick,
    handleEditBtnClick,
  };
}

export default usePageModal;
