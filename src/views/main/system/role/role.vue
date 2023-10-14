<template>
  <div class="role">
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
    />
    <page-modal
      ref="modalRef"
      :other-info="otherInfo"
      :modal-config="modalConfig"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>
<script setup lang="ts">
import PageSearch from "@/components/page-search/page-search.vue";
import searchConfig from "./config/search.config";

import PageContent from "@/components/page-content/page-content.vue";
import contentConfig from "./config/content.config";

import PageModal from "@/components/page-modal/page-modal.vue";
import modalConfig from "./config/modal.config";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";

import { nextTick, ref } from "vue";
import useMainStore from "@/store/main/main";
import { storeToRefs } from "pinia";
import type { ElTree } from "element-plus";
import { mapMenuListToids } from "@/utils/map-menus";

// 查询和重置
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

// 新增和编辑
const { modalRef, handleNewBtnClick, handleEditBtnClick } =
  usePageModal(editCallback);

// 获取完整的菜单
const mainStore = useMainStore();
const { entireMenus } = storeToRefs(mainStore);

// 选中菜单项的事件
const otherInfo = ref({});
const treeRef = ref<InstanceType<typeof ElTree>>();
function handleElTreeCheck(_data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  otherInfo.value = { menuList };
}

function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToids(itemData.menuList);
    treeRef.value?.setCheckedKeys(menuIds);
  });
}
</script>
<style lang="less" scoped>
.role {
}
</style>
