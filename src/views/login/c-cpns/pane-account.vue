<template>
  <div class="panel-account">
    <el-form
      ref="formRef"
      status-icon
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
    >
      <!-- 账号登录的pane -->
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <!-- 密码登录的panel -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import type { FormRules, ElForm } from "element-plus";
import type { IAccount } from "@/types";

import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import useLoginStore from "@/store/login/login";

// 定义account数据
const account = reactive<IAccount>({
  name: "coderwhy",
  password: "123456",
});

// 定义校验规则
const accountRules: FormRules = {
  name: [{ required: true, message: "必须输入帐号", trigger: "blur" }],
  password: [{ required: true, message: "必须输入密码", trigger: "blur" }],
};

// 执行帐号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();
function loginAction() {
  formRef.value?.validate(async (valid) => {
    // 验证失败
    if (!valid) {
      ElMessage.error("验证失败");
      return;
    }
    const name = account.name;
    const password = account.password;
    loginStore.loginAccountAction({ name, password });
  });
}
defineExpose({
  loginAction,
});
</script>
<style lang="less" scoped>
.panel-account {
}
</style>
