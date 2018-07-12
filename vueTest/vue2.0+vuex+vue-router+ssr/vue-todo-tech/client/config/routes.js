// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id',
    // props: true,

    // props: {
    //   id: 'csqcqsaaaaaas'
    // },
    // props: (route) => ({id: route.query.b}),

    // components: {
    //   default: Todo,
    //   a: Login
    // },
    // component: Todo,
    component: () => import('../views/todo/todo.vue'),

    name: 'app',
    meta: {
      title: 'this is Todo page',
      descripition: 'asdf'
    },
    beforeEnter (to, from, next) {
      console.log('路由守卫内部钩子')
      next()
    }
    // children: [
    //   {
    //     path: '/test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: 'login/exact',
    component: () => import('../views/Login/Login.vue')
  }
]
