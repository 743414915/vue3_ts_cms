<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
      @closed="setModalNotVisible"
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placheolder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placheolder="部门领导" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placheolder="请选择上级部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setModalNotVisible">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import useMainStore from "@/store/main/main";
import useSystemStore from "@/store/main/system/system";
import type ElForm from "element-plus/lib/components/form/index.js";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

// 定义数据
const dialogVisible = ref(false);
const formData = reactive<any>({
  name: "",
  leader: "",
  parentId: "",
});
const isNewRef = ref(true);
const editData = ref<any>();

// 获取role、department的数据
const mainStore = useMainStore();
const { entireDepartments } = storeToRefs(mainStore);

// 设置dialog的可见
function setModalVisible() {
  dialogVisible.value = true;
}
// 设置dialog的不可见
function setModalNotVisible() {
  dialogVisible.value = false;
}
/**
 * 设置dialog的基础属性
 * @param isNew 是否是新建，默认true
 * @param itemData 编辑时候的回显数据
 */
function setModal(isNew: boolean = true, itemData?: any) {
  // 显示dialog
  setModalVisible();
  isNewRef.value = isNew;

  if (!isNew && itemData) {
    editData.value = itemData;
    for (const key in formData) {
      formData[key] = itemData[key];
    }
  } else {
    editData.value = null;
    for (const key in formData) {
      formData[key] = "";
    }
  }
}

// 点击了确定
const systemStore = useSystemStore();
function handleConfirmClick() {
  // 隐藏dialog
  setModalNotVisible();

  if (!isNewRef.value && editData.value) {
    // 修改
    systemStore.editPageDataAction("department", editData.value.id, formData);
  } else {
    // 新建
    systemStore.newPageDataAction("department", formData);
  }
}

defineExpose({ setModal });
</script>
<style lang="less" scoped>
.modal {
}
</style>
