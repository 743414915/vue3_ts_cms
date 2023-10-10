<template>
  <div class="main-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">管理系统</h2>
    </div>

    <!-- menu -->
    <div class="menu">
      <el-menu
        default-active="3"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
      >
        <!-- 系统总览 -->
        <!-- <el-sub-menu index="">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item>核心技术</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
        </el-sub-menu> -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import useLoginStore from "@/store/login/login";

// 获取动态菜单
const loginStroe = useLoginStore();
const userMenus = loginStroe.usersMenus;
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>
