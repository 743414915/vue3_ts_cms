<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip effect="light" :content="tips" placement="top">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subTitle }}</span>
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CountUp } from "countup.js";
import { onMounted, ref } from "vue";

interface IProps {
  title?: string;
  tips?: string;
  number1?: number;
  number2?: number;
  subTitle?: string;
  amount?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  title: "商品总销量",
  tips: "所有的商品总销量",
  number1: 0,
  number2: 0,
  subTitle: "商品总销量",
});

// 创建CountUp实例对象
const count1Ref = ref<HTMLElement>();
const count2Ref = ref<HTMLElement>();
const conutOption = {
  duration: 1,
  prefix: props.amount === "saleroom" ? "￥" : "",
};
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1, conutOption);
  countup1.start();
  const countup2 = new CountUp(count2Ref.value!, props.number2, conutOption);
  countup1.start();
  countup2.start();
});
</script>
<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
