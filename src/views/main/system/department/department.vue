<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />

    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    >
      <template #leader="scope"> {{ scope.row[scope.prop] }} </template>
    </page-content>

    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from "vue";
import PageSearch from "@/components/page-search/page-search.vue";
import PageContent from "@/components/page-content/page-content.vue";
import PageModal from "./c-cpns/page-modal.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";

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
