<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="60px"
        />

        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="80px"
        />
        <el-table-column align="center" label="创建时间" prop="createAt" />
        <el-table-column align="center" label="更新时间" prop="updateAt" />
        <el-table-column align="center" label="操作" width="160px">
          <el-button icon="Edit" text type="primary" size="small">
            编辑
          </el-button>
          <el-button icon="Delete" text type="danger" size="small">
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import useSystemStore from "@/store/main/system/system";

// 请求usersList数据
const systemStore = useSystemStore();
systemStore.postUsersListAction();

// 获取usersList数据进行展示
const { usersList } = storeToRefs(systemStore);
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

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
