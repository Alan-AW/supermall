// 使用防抖函数
const aa = this.debounce(this.$refs.scroll.refresh, 500);
aa();  // 在图片加载完成之后才需要调用刷新，调用刷新的时候会执行防抖

// 防抖函数
methods: {
  // 图片加载事件的防抖函数
  debounce: function debounce(func, delay) {  // 将要执行的函数与防抖时间传入进来
    let timer = null;       // 设置一个计划任务
    return function (...args) {  // 图片加载一次会调用一次debounce的返回值
      if (timer) clearTimeout(timer);  // debounce被调用的时候先清除一下上一次的计划任务
      timer = setTimeout(() => {       // 然后将本次调用添加到下一次计划任务中
        func.apply(this, args);        // 计时结束开始执行真正的被防抖的函数也就是刷新refresh
      }, delay);
    };
  }
}

/*
如果图片来的太快，每张图片加载完成的时间小于设定的时间的话
那么刷新事件会被加入到计划任务中，而不会被执行。
如果图片来的太慢，加载完成的时间大于设定的时间的话，
计时器结束之后会执行一次刷新事件：refresh被调用
这样就起到了防抖效果。
*/