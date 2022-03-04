<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3, // 1-1都是不能实时监听滚动的；2只监听手指的滚动；3只要是滚动全都监听
      click: true, // (新版已经可以监听了)默认阻止浏览器的点击事件，必须设置为true
      pullUpLoad: true, // 上拉加载更多
    });
  },
};
</script>

<style scoped>
</style>