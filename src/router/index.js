import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Result from '../views/Result.vue'
import About from '../views/About.vue'

const routes = [
  // {
  //   path:"/",
  //   name:"MRT",
  //   component:Home,
  //   redirect:"/home",
  //   children:[
  //     {
  //       path: 'home',
  //       name: 'Home',
  //       component: Home,
  //     },
  //     {
  //       path: 'result',
  //       name: 'Result',
  //       component: Result
  //     },
  //   ]
  // },
  // {
  //   path:'/about',
  //   name:'About',
  //   component: About
  // }



  // {
  //   path: '/:home(.*)*', 
  //   name: 'not-found', 
  //   component: Home 
  // },




  {
    path: '/',
    name: 'MRT',
    component: Home,
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path:'/about',
    name:'About',
    component: About
  }





  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
