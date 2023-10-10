<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间tabs -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登陆</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登陆</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      @click="handleLoginBtnClick"
      class="login-btn"
      size="large"
      type="primary"
    >
      登录
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import PaneAccount from "./pane-account.vue";
import PanePhone from "./pane-phone.vue";
import { localCache } from "@/utils/cache";

const activeName = ref("account");
const CACHE_ISREMPWD = "isRemPwd";
const isRemPwd = ref<boolean>(localCache.getCache(CACHE_ISREMPWD) ?? false);
watch(isRemPwd, (newVal) => {
  localCache.setCache(CACHE_ISREMPWD, newVal);
});
const accountRef = ref<InstanceType<typeof PaneAccount>>();

function handleLoginBtnClick() {
  if (activeName.value === "account") {
    accountRef.value?.loginAction(isRemPwd.value);
  } else {
    console.log("手机登陆");
  }
}
</script>
<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
