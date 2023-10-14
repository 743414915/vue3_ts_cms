<template>
  <div class="search">
    <!-- 输入查询关键字的表单 -->
    <el-form
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
      :model="searchForm"
    >
      <el-row :gutter="20">
        <template
          v-for="item in searchConfig.formItems"
          :key="item.formItemBind.prop"
        >
          <el-col :span="item.span">
            <el-form-item v-bind="item.formItemBind">
              <!-- 普通输入框的类型 -->
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.formItemBind.prop]"
                  v-bind="item.componentBind"
                />
              </template>

              <!-- 时间选择器的类型 -->
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.formItemBind.prop]"
                  v-bind="item.componentBind"
                />
              </template>

              <!-- 选择器的类型 -->
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.formItemBind.prop]"
                  v-bind="item.componentBind"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value">
                    </el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
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

interface IProps {
  searchConfig: {
    labelWidth?: string;
    formItems: any[];
  };
}

// 定义自定义事件
const emit = defineEmits(["queryClick", "resetClick"]);
// 接受外部组件传递的属性
const props = defineProps<IProps>();

// 定义form数据
const initialForm: any = {};
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? "";
}
const searchForm = reactive(initialForm);

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
