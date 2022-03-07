<template>
  <div>
    <tab-bar>
      <!-- path:指定跳转到某个路由；activatedColor:导航点击之后文本的颜色，默认为红色。 -->
      <tab-bar-item path="/home" activatedColor="#FFB6C1">
        <img slot="item-icon" src="@/assets/img/tabbar/home.png" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/homeactive.png" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activatedColor="#FFB6C1">
        <img slot="item-icon" src="@/assets/img/tabbar/category.png" />
        <img
          slot="item-icon-active"
          src="@/assets/img/tabbar/categoryactive.png"
        />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activatedColor="#FFB6C1">
        <img slot="item-icon" src="@/assets/img/tabbar/car.png" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/caractive.png" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activatedColor="#FFB6C1">
        <img slot="item-icon" src="@/assets/img/tabbar/profile.png" />
        <img
          slot="item-icon-active"
          src="@/assets/img/tabbar/profileactive.png"
        />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "ManTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>
