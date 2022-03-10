<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :top-imgs="topImgs"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";

import { getDetaildata, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
  data() {
    return {
      iid: null,
      topImgs: null,
      goods: {},
      shop: {},
    };
  },
  created() {
    // 1.保存iid
    this.iid = this.$route.params.iid;
    // 请求数据
    getDetaildata(this.iid).then((res) => {
      const data = res.result;
      // 获取顶部的轮播图片
      this.topImgs = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建商铺信息的对象
      this.shop = new Shop(data.shopInfo);
    });
  },
};
</script>

<style scoped>
</style>