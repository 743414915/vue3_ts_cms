<template>
  <div class="dashboard">
    <!-- 顶部的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="饼图">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card header="折现图">
          <line-echart v-bind="showGoodsCategorySale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card header="玫瑰图">
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card header="地图">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card header="柱状图">
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import CountCard from "./c-cpns/count-card/count-card.vue";
import ChartCard from "./c-cpns/chart-card/chart-card.vue";
import useAnalysisStore from "@/store/main/analysis/analysis";
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  MapEchart,
  BarEchart,
} from "@/components/page-echarts";
import { computed } from "vue";

// 发起网络请求
const analysisStore = useAnalysisStore();
analysisStore.fetchAnalysisDataAction();

// 从store中获取数据
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale,
} = storeToRefs(analysisStore);

// 3.获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount,
  }));
});
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name);
  const values = goodsCategorySale.value.map((item) => item.goodsCount);
  return { labels, values };
});

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name);
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor);
  return { labels, values };
});
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count,
  }));
});
</script>
<style lang="less" scoped>
.dashboard {
  .el-row {
    margin-bottom: 10px;
  }
}
</style>
