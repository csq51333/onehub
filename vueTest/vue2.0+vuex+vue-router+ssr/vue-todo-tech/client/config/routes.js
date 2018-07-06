import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    component: Todo,
    name: 'app',
    meta: {
      title: 'this is Todo page',
      descripition: 'asdf'
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
    component: Login
  },
  {
    path: 'login/exact',
    component: Login
  }
]
