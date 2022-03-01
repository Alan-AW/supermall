<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">京东</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
    <feature-view />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childComps/HomeSwiper';
  import HomeRecommendView from './childComps/HomeRecommendView';
  import FeatureView from './childComps/FeatureView';

  import { getHomeMultidata } from 'network/home';


  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
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
</style>
