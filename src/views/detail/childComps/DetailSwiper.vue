<template>
  <swiper class="swoper">
    <swiper-item v-for="item in topImgs">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImgs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.swoper {
  height: 300px;
  overflow: hidden;
}
</style>