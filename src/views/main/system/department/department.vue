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

    <page-modal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed, ref } from "vue";
import PageSearch from "@/components/page-search/page-search.vue";
import PageContent from "@/components/page-content/page-content.vue";
import PageModal from "@/components/page-modal/page-modal.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";
import useMainStore from "@/store/main/main";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";

// 对mofalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore();
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id };
  });
  modalConfig.formItems.forEach((item) => {
    if (item.formItemBind.prop === "parentId") {
      item.options = departments as any;
    }
  });

  return modalConfig;
});

// 查询和重置
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

// 新增和编辑
const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal();
</script>

<style scoped></style>
