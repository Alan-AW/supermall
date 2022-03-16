<template>
  <div>
    <Swiper class="swoper">
      <SwiperItem v-for="item in topImgs">
        <img :src="item" alt="" />
      </SwiperItem>
    </Swiper>
  </div>
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