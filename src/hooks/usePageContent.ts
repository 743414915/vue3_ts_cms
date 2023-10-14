import { ref } from "vue";
import type PageContent from "@/components/page-content/page-content.vue";

function usePageContent() {
  // 点击了查询
  const contentRef = ref<InstanceType<typeof PageContent>>();
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.featchPageListData(queryInfo);
  }
  // 点击了重置
  function handleResetClick() {
    contentRef.value?.featchPageListData();
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick,
  };
}

export default usePageContent;
