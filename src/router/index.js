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
    path: '/total',
    name: 'Total',
    component: () => import('@/views/Total')
  }
]

let vueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

vueRouter.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

vueRouter.afterEach(function () {
  setTimeout(() => {
    store.commit('updateLoadingStatus', {isLoading: false})
  }, 800)
})

export default vueRouter