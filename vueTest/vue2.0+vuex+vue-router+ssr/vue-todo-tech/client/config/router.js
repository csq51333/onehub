import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
  })
}

// 每次都返回一个新建的router是为了防止router缓存
// 项目是服务端渲染，都会重新生成新的app
// 如果router只有一个，那么它会缓存每次新建的app
// 导致服务端流程渲染结束app对象它没有释放掉，最终内存溢出
// const router = new Router({
//   routes
// })
// export default router
