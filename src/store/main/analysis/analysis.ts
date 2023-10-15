import {
  getAmountListData,
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale,
} from "@/service/main/analysis/analysis";
import { defineStore } from "pinia";

interface IAnalysisState {
  amountList: any[];
  goodsCategoryCount: any[];
  goodsCategorySale: any[];
  goodsCategoryFavor: any[];
  goodsAddressSale: any[];
}

const useAnalysisStore = defineStore("analysis", {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: [],
  }),
  actions: {
    /**
     * 获取dashboard的数据展示
     */
    async fetchAnalysisDataAction() {
      const amountResult = await getAmountListData();
      this.amountList = amountResult.data;

      const goodsCategoryCountResult = await getGoodsCategoryCount();
      this.goodsCategoryCount = goodsCategoryCountResult.data;

      const goodsCategorySaleResult = await getGoodsCategorySale();
      this.goodsCategorySale = goodsCategorySaleResult.data;

      const goodsCategoryFavorResult = await getGoodsCategoryFavor();
      this.goodsCategoryFavor = goodsCategoryFavorResult.data;

      const goodsAddressSaleResult = await getGoodsAddressSale();
      this.goodsAddressSale = goodsAddressSaleResult.data;
    },
  },
});

export default useAnalysisStore;
