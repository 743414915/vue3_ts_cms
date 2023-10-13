<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
      @closed="setModalNotVisible"
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placheolder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placheolder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placheolder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placheolder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placheolder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placheolder="请选择部门"
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
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: "",
});
const isNewRef = ref(true);
const editData = ref<any>();

// 获取role、department的数据
const mainStore = useMainStore();
const { entireRoles, entireDepartments } = storeToRefs(mainStore);

// 设置dialog的可见
function setModalVisible() {
  dialogVisible.value = true;
}
// 设置dialog的不可见
function setModalNotVisible() {
  dialogVisible.value = false;
}
// 设置dialog的基础属性
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
    systemStore.editUserDataAction(editData.value.id, formData);
  } else {
    // 新建
    systemStore.newUserDataAction(formData);
  }
}

defineExpose({ setModal });
</script>
<style lang="less" scoped>
.modal {
}
</style>
