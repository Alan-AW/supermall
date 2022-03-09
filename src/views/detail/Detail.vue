<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
  },
  data() {
    return {
      iid: null,
    };
  },
  created() {
    // 1.保存iid
    this.iid = this.$route.params.iid;

    // 请求数据
  },
};
</script>

<style scoped>
</style>