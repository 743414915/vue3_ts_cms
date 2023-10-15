<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
      @closed="setModalNotVisible"
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template
            v-for="item in modalConfig.formItems"
            :key="item.formItemBind?.prop"
          >
            <el-form-item v-bind="item.formItemBind">
              <!-- 普通输入框的类型 -->
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.formItemBind.prop]"
                  v-bind="item.componentBind"
                />
              </template>

              <!-- 时间选择器的类型 -->
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.formItemBind.prop]"
                  v-bind="item.componentBind"
                />
              </template>

              <!-- 选择器的类型 -->
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.formItemBind.prop]"
                  v-bind="item.componentBind"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value">
                    </el-option>
                  </template>
                </el-select>
              </template>

              <!-- 字定义插槽的类型 -->
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from "@/store/main/system/system";
import type ElForm from "element-plus/lib/components/form/index.js";
import { reactive, ref } from "vue";

interface IProps {
  modalConfig: {
    pageName: string;
    header: {
      newTitle: string;
      editTitle: string;
    };
    formItems: any[];
  };
  otherInfo?: any;
}
const props = defineProps<IProps>();

// 定义数据
const dialogVisible = ref(false);
const initialData: any = {};
for (const item of props.modalConfig.formItems) {
  initialData[item.formItemBind.prop] = item.initialValue ?? "";
}
const formData = reactive<any>(initialData);
const isNewRef = ref(true);
const editData = ref<any>();

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

  // 编辑
  if (!isNew && itemData) {
    editData.value = itemData;
    for (const key in formData) {
      formData[key] = itemData[key];
    }
  } else {
    // 新建
    editData.value = null;
    for (const key in formData) {
      // 找到在config中当前项对应的配置项
      const item = props.modalConfig.formItems.find(
        (item) => item.formItemBind.prop === key,
      );
      formData[key] = item ? item.initialValue : "";
    }
  }
}

// 点击了确定
const systemStore = useSystemStore();
function handleConfirmClick() {
  // 隐藏dialog
  setModalNotVisible();

  // 合并formData以及外部组件传递进来的数据
  let infoData = { ...formData };
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo };
  }

  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData,
    );
  } else {
    // 新建
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData);
  }
}

defineExpose({ setModal });
</script>
<style lang="less" scoped>
.modal {
}
</style>
