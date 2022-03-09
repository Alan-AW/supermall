<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/ManTabBar";

export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import url("assets/css/base");
</style>
