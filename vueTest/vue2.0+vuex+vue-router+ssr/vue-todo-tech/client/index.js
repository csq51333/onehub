import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

store.registerModule('c', {
  state: {
    text: 3
  }
})

// store.watch((state) => state.count + 1000, (newCount) => {
//   console.log('new count watched:', newCount)
// })

// store.subscribe((mutation, state) => {
//   console.log(mutation.type) // 函数名
//   console.log(mutation.payload) // 函数的参数
// })

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  next()
  // if (to.fullPath === '/app') {
  //   // next('/login')
  //   next({path: '/login', name: 'name'})
  // } else {
  //   console.log(to)
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
