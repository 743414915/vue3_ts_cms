<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content ref="contentRef" />
  </div>
</template>
<script setup lang="ts">
import UserSearch from "./c-cpns/user-search.vue";
import UserContent from "./c-cpns/user-content.vue";
import { ref } from "vue";

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>();
function handleQueryClick(formData: any) {
  contentRef.value?.featchUserListData(formData);
}
function handleResetClick() {
  contentRef.value?.featchUserListData();
}
</script>
<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
