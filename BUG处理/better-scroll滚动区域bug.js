/*解决在首页中可滚动区域的问题
一、问题：
在Vue商城项目中我们使用的是Better-scroll滚动组件，该组件是在iscroll组件的基础上优化而来的。有更多的功能，同时也会产生一些BUG

其原理是：在父元素中定义一个content元素，该子元素就可以在父元素的指定高度内进行滚动，相比原生滚动在移动端的表现更流畅；HTML结构为：

<div class="wrapper">
  <div class="content">
    ......
  </div> 
</div>
所以在HTML页面中用户的可滚动范围是根据scrollHeight属性决定的，在组件创建之后，better-scroll便会自动进行一个计算：假设wrapper元素的高度为200px，content元素的高度为300px；

那么当前页面中可滚动距离为：300px-200px=100px

也就是scrollHeight属性的值为100px；

由于组件创建完成的时候，页面中有大量图片还没有加载完成，所以当前可滚动高度并不包含图片加载完成之后的高度，当所有图片加载完成之后content元素的高度也随之发生了改变，此时的可滚动距离100px已经不满足页面的滚动需求了，但是better-scroll已经计算完成此次页面的可滚动高度为100px；所以超出300px之外的内容将变得不可滚动，无法查看。

二、解决办法：
1.首先监听每一张图片是否都加载完成

2.在监听到图片加载完成之后发送一个事件到Vue事件总线中

3.在使用better-scroll的地方进行监听该加载事件，每加载完成一次调用一次better-scroll-refresh()方法

三、如何操作：
1.自定义事件

<template>
  <div class="goods-item">
    <img :src="xxx" @load="imageLoad" />
  </div>
</template>
↑在页面中需要显示图片的组件中找到图片所对应的img标签，定义一个Load加载完成监听事件(该方法是Vue自带的方法)；也可以使用js原生的方法：

img.onload = function() {
  ......
}
↑js原生的监听图片加载方法

2.图片加载完成之后向外发射一个事件：

methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
  },
3.在引用better-scroll的组件中监听该事件，并且调用refresh方法重新计算高度

this.$bus.$on("itemImageLoad", () => {
      this.$refs.scroll.refresh(); // 加载出一张图片就进行刷新重新计算高度
    });
4.定义事件总线-->在根组件(man.js)中定义一个事件总线（因为他默认的$bus是不存在的）

Vue.prototype.$bus = new Vue()
↑使用Vue实例定义事件总线*/