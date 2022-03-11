<template>
  <div class="detail">
    <detail-nav-bar />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-img-info :detail-info="detailInfo"></detail-img-info>
      <detail-param-info :param-info="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImgInfo from "./childComps/detailImgInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";

import { getDetaildata, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailImgInfo,
    DetailParamInfo,
  },
  data() {
    return {
      iid: null,
      topImgs: null,
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
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
      this.shopInfo = new Shop(data.shopInfo);
      // 封装详情信息
      this.detailInfo = data.detailInfo;
      // 获取商品参数信息
      this.pramaInfo = data.itemParams;
    });
  },
};
</script>

<style scoped>
.nav-bar img {
  margin-top: 10px;
}

.title {
  display: flex;
}

.title-item {
  flex: 1;
  font-size: 13px;
}
.detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}

.content {
  background-color: #fff;
  height: calc(100vh-44px);
}
</style>