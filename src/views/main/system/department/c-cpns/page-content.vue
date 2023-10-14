<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="60px"
        />

        <el-table-column
          align="center"
          label="部门名称"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="部门领导"
          prop="leader"
          width="150px"
        />
        <el-table-column
          align="center"
          label="上级部门"
          prop="parentId"
          width="150px"
        />
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            <div>
              {{ formatUTC(scope.row.createAt) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            <div>
              {{ formatUTC(scope.row.updateAt) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160px">
          <template #default="scope">
            <el-button
              icon="Edit"
              text
              type="primary"
              size="small"
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
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
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import useSystemStore from "@/store/main/system/system";
import { formatUTC } from "@/utils/format";
import { ref } from "vue";

// 定义事件
const emit = defineEmits(["newClick", "editClick"]);

// 页码相关
const currentPage = ref(1);
const pageSize = ref(10);
function handleSizeChange() {
  featchPageListData();
}
function handleCurrentChange() {
  featchPageListData();
}

// 请求usersList数据
const systemStore = useSystemStore();
featchPageListData();

// 获取usersList数据进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore);

// 用于网络请求获取用户列表
function featchPageListData(formData: any = {}) {
  // 获取offset、size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };

  const queryInfo = { ...pageInfo, ...formData };
  systemStore.postPageListAction("department", queryInfo);
}

// 删除的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction("department", id);
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
