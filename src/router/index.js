import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('@/views/Inventory')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About')
  }
]

let vueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由跳转前的钩子
vueRouter.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

// 路由跳转后的钩子
vueRouter.afterEach(function () {
  setTimeout(() => {
    store.commit('updateLoadingStatus', {isLoading: false})
  }, 800)
})

export default vueRouter