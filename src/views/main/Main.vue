<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="aside" :width="asideWidth">
        <main-menu :isCollapse="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header class="header" height="50px">
          <main-header @foldChange="handlefoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import MainMenu from "@/components/main-menu";
import MainHeader from "@/components/main-header";

// 处理main-header中折叠的变化
const isFold = ref(false);
function handlefoldChange(flag: boolean) {
  isFold.value = flag;
}

// 判断菜单的宽度
const asideWidth = computed(() => {
  return isFold.value ? "60px" : "210px";
});
</script>
<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .main-content {
    // width: 100%;
    height: 100%;
    .header {
      display: flex;
      color: #333;
      text-align: center;
      align-items: center;
    }
    .aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.2s linear;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */

      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-main {
      color: #333;
      background-color: #f0f2f5;
    }
  }
}
</style>
