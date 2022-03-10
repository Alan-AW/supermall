<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>

    <div v-for="item in detailInfo.detailImage">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          v-for="(item, index) in item.list"
          :key="index"
          :src="item"
          @load="imgLoad"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imgLength: 0,
    };
  },
  methods: {
    imgLoad() {
      // 这里判断所有图片加载完，执行回调
      if (++this.counter === this.imgLength) {
        // 如果没有这层判断会导致图片回调太多次数
        this.$bus.$emit("imgLoad");
      }
    },
  },
  watch: {
    // 监听获得组件发生变化赋值
    detailInfo() {
      this.imgLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
