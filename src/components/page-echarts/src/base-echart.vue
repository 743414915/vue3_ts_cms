<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

interface IProps {
  option: EChartsOption;
}
const props = defineProps<IProps>();

const echartRef = ref<HTMLElement>();

onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, "light", {
    renderer: "canvas",
  });

  watchEffect(() => echartInstance.setOption(props.option));

  // 监听window窗口的缩放
  window.addEventListener("resize", () => {
    echartInstance.resize();
  });
});
</script>
<style lang="less" scoped>
.base-echart {
  .echart {
    height: 300px;
  }
}
</style>
