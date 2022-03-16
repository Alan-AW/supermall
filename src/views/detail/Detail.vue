<template>
  <div class="detail">
    <DetailNavBar />
    <Scroll class="content" ref="scroll">
      <DetailSwiper :top-imgs="topImgs"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shopInfo"></DetailShopInfo>
      <DetailImgInfo :detail-info="detailInfo"></DetailImgInfo>
      <DetailParamInfo :param-info="itemParams" />
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import Scroll from "components/common/scroll/Scroll";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
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
      itemParams: {},
    };
  },
  created() {
    // 1.保存iid
    this.iid = this.$route.params.iid;
    // 请求数据
    getDetaildata(this.iid).then((res) => {
      // 1.保存所有信息到data
      const data = res.result;
      // 2.获取顶部的轮播图片
      this.topImgs = data.itemInfo.topImages;
      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 4.创建商铺信息的对象
      this.shopInfo = new Shop(data.shopInfo);
      // 5.封装详情信息
      this.detailInfo = data.detailInfo;
      // 6.获取商品参数信息
      this.itemParams = data.itemParams;
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
