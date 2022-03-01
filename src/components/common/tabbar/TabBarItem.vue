<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active: isActive}" :style="activeStyle">
        <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activatedColor: String,
      default: '#FF0000'
    },
    data() {
      return {}
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1;
        
        /* 
        解释：返回： 查看当前浏览器的路由是否包含当前被点击的item的路由，indexOf找到了就不等于-1否则为-1；
        this.path表示的是当前被点击的item传递过来的path，
        this.$route.path表示的是所有的item的path.
          /home => item(/home) = true
          /cart => item(/cart) = true
          ...
          也可以写成这样
            return this.$route.path == this.path;
        */
      },
      activeStyle() {
        return this.isActive ? {color: this.activatedColor} : {color: this.default};
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path);
      }
    }
  }
</script>

<style>
  .tab-bar-item {
    flex: 1;
    /* 均等分 */
    text-align: center;
    height: 49px;
    /* 默认都是49 */
    font-size: 0.875rem;
  }
  
  /* 图片设置 */
  .tab-bar-item img {
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.1875rem;
    vertical-align: middle;
    margin-bottom: 0.125rem;
  }

</style>
