<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from "./c-cpns/page-search.vue";
import PageContent from "./c-cpns/page-content.vue";
import PageModal from "./c-cpns/page-modal.vue";
import { ref } from "vue";

// 点击了查询
const contentRef = ref<InstanceType<typeof PageContent>>();
function handleQueryClick(queryInfo: any) {
  contentRef.value?.featchPageListData(queryInfo);
}
// 点击了重置
function handleResetClick() {
  contentRef.value?.featchPageListData();
}

const modalRef = ref<InstanceType<typeof PageModal>>();
// 点击了新增
function handleNewBtnClick() {
  modalRef.value?.setModal();
}
// 点击了编辑
function handleEditBtnClick(itemData: any) {
  modalRef.value?.setModal(false, itemData);
}
</script>

<style scoped></style>
