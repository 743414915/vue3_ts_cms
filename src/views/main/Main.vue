<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="aside" width="210px">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header class="header" height="50px">
          <main-header></main-header>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import MainMenu from "@/components/main-menu";
import MainHeader from "@/components/main-header";
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
      transition: width 0.3s linear;
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
