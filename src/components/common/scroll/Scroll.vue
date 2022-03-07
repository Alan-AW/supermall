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
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建Scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType, // 0-1都是不能实时监听滚动的；2只监听手指的滚动；3只要是滚动全都监听
      pullUpLoad: this.pullUpLoad, // 上拉加载更多
      click: true, // (新版已经可以监听了)默认阻止浏览器的点击事件，必须设置为true
    });
    // 监听滚动区域
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
</style>
