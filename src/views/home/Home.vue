<template>
  <div id="home">
    <h2>kdhfasdhkskdksdj</h2>
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
  </div>
</template>

<script>
  // import { defineComponent } from '@vue/composition-api'
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'Home',
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>