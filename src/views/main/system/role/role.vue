<template>
  <div class="role">
    <page-search :search-config="SearchConfig" />
  </div>
</template>
<script setup lang="ts">
import PageSearch from "@/components/page-search/page-search.vue";
import SearchConfig from "./config/search.config";
</script>
<style lang="less" scoped>
.role {
}
</style>
