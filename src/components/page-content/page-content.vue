<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? "数据列表" }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig?.header?.btnTitle ?? "新建数据" }}
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <!-- 格式化时间 -->
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <!-- 操作 -->
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  icon="Edit"
                  text
                  type="primary"
                  size="small"
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  icon="Delete"
                  text
                  type="danger"
                  size="small"
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>

          <!-- 自定义插槽的方式展示数据 -->
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>

          <!-- 普通的类型，不需要数据处理，直接显示数据就行 -->
          <template v-else>
            <el-table-column v-bind="item"> </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import useSystemStore from "@/store/main/system/system";
import { formatUTC } from "@/utils/format";
import usePermission from "@/hooks/usePermissions";

interface IProps {
  contentConfig: {
    pageName: string;
    header: {
      title?: string;
      btnTitle?: string;
    };
    propsList: any[];
    childrenTree?: any;
  };
}
const props = defineProps<IProps>();

// 定义事件
const emit = defineEmits(["newClick", "editClick"]);

// 获取当前用户增删改查的权限
const isCreate = usePermission(`${props.contentConfig.pageName}:create`);
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`);
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`);
const isQuery = usePermission(`${props.contentConfig.pageName}:query`);

// 页码相关
const currentPage = ref(1);
const pageSize = ref(10);
// element-plus 官方不推荐下面注释的方法，后面会删除
// 事件不推荐使用
// 如果要监听 current-page 和 page-size 的改变，
// 使用 v-model 双向绑定是个更好的选择。
watch(
  () => [pageSize.value, currentPage.value],
  () => {
    featchPageListData();
  },
);
// @size-change="handleSizeChange"
// @current-change="handleCurrentChange"
// function handleSizeChange() {
//   featchPageListData();
// }
// function handleCurrentChange() {
//   featchPageListData();
// }

// 请求pageList数据
const systemStore = useSystemStore();

// 监听systemStore中的action是否被执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === "deletePageByIdAction" ||
      name === "editPageDataAction" ||
      name === "newPageDataAction"
    ) {
      currentPage.value = 1;
    }
  });
});
featchPageListData();

// 获取pageList数据进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore);

// 用于网络请求获取用户列表
function featchPageListData(formData: any = {}) {
  // 没有查询的权限
  if (!isQuery) return;

  // 获取offset、size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };

  const queryInfo = { ...pageInfo, ...formData };
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo);
}

// 删除的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id);
}
// 新建用户的操作
function handleNewUserClick() {
  emit("newClick");
}
// 编辑用户的操作
function handleEditBtnClick(itemData: any) {
  emit("editClick", itemData);
}

defineExpose({ featchPageListData });
</script>
<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 14px 0;
    }
    .el-button {
      margin: 0;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
