<template>
  <div class="search">
    <!-- 输入查询关键字的表单 -->
    <el-form ref="formRef" label-width="80px" size="large" :model="searchForm">
      <el-row :gutter="20"> </el-row>
    </el-form>

    <!-- 重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ElForm } from "element-plus";
import { ref, reactive } from "vue";

// 定义自定义事件
const emit = defineEmits(["queryClick", "resetClick"]);

// 定义form数据
const searchForm = reactive({});

// 重置的操作
const formRef = ref<InstanceType<typeof ElForm>>();
function handleResetClick() {
  // form表单的数据重置
  formRef.value?.resetFields();

  emit("resetClick");
}

// 查询的操作
function handleQueryClick() {
  emit("queryClick", searchForm);
}
</script>
<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>