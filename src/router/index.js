import Vue from 'vue'
import VueRouter from 'vue-router'
const App = () => import('../App.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: App
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
