<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content
      ref="contentRef"
      @edit-click="handleEditBtnClick"
      @new-click="handleNewBtnClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
import UserSearch from "./c-cpns/user-search.vue";
import UserContent from "./c-cpns/user-content.vue";
import UserModal from "./c-cpns/user-modal.vue";
import { ref } from "vue";

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>();
function handleQueryClick(formData: any) {
  contentRef.value?.featchUserListData(formData);
}
function handleResetClick() {
  contentRef.value?.featchUserListData();
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>();
function handleNewBtnClick() {
  modalRef.value?.setModal();
}
function handleEditBtnClick(itemData: any) {
  modalRef.value?.setModal(false, itemData);
}
</script>
<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
