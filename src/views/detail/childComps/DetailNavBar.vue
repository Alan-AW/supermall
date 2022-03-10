<template>
  <nav-bar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="@/assets/img/common/back.svg" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(title, index) in titles"
        class="center-title"
        :class="{ activate: index === currentIndex }"
        @click="titleClick(index)"
      >
        {{ title }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.title {
  display: flex;
}

.center-title {
  flex: 1;
  font-size: 13px;
}

.activate {
  color: var(--color-high-text);
}

.back img {
  margin-top: 13px;
  margin-left: 30px;
}
</style>