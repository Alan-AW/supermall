<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">京东</div></nav-bar>
    <tab-control
      :titles="titles"
      class="tab-control1"
      @tabClick="tabClick"
      v-show="isTabFixed"
      ref="tabcontrol1"
    />
    <scroll
      class="content"
      ref="scroll"
      :prob-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swipperimgLoad="swipperimgLoad" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabcontrol2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="ShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop.vue";
import { debounce } from "common/utils";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    saveY: 0,
  },
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
      currentType: "pop",
      ShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  activated() {
    // 活跃状态
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },

  deactivated() {
    // 非活跃状态
    this.saveY = this.$refs.scroll.getScrollY();
  },

  created() {
    // 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {
    // 监听item图片加载事件
    const refresh = debounce(this.$refs.scroll.refresh, 300);
    this.$bus.$on("itemImageLoad", () => {
      // 防抖debounce
      refresh();
    });
  },

  methods: {
    // 事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },

    // 是否显示top图标
    contentScroll(position) {
      // 判断backTop是否显示
      this.ShowBackTop = -position.y > 1000;
      // 决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    // 返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    // 网络请求相关
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
        this.$refs.scroll.finishPullUp();
      });
    },
    swipperimgLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 99999;
}
</style>
