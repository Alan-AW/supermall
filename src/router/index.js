import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')


Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  // 购物车
  {
    path: '/cart',
    component: Cart
  },
  // 分类
  {
    path: '/category',
    component: Category
  },
  // 我的
  {
    path: '/profile',
    component: Profile
  },
  // 详情页
  {
    path: '/detail/:iid',
    component: Detail
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
