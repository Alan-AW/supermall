<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">京东</div></nav-bar>
    <home-swiper :banners="banners" />
    <home-recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="titles" class="tab-control" />
    <goods-list :goods="goods['pop'].list" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/TabControl";
import GoodsList from "components/content/goods/Goods";

import { getHomeMultidata, getHomeGoods } from "network/home";
import GoodsList from "@/components/content/goods/GoodsList.vue";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
  },

  created() {
    // 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    /* 商品信息的请求原理：在data中定义一种数据结构-goods；然后再将网络请求进行封装，
      通过生命周期函数create()在创建出该组件的时候调用本方法进行网络请求；
      然后将请求到的数据通过push()方法的解析方法追加到data中；并且页码+1；
      在下次调用本方法的时候(上拉加载更多)自动页码+1进行网络请求；
    */
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}

/* 自动吸顶，大部分移动端浏览器支持，IE不支持 */
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 999;
  background-color: #fff;
}
</style>
