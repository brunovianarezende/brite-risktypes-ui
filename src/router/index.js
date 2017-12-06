import Vue from 'vue'
import Router from 'vue-router'
import TypesList from '@/components/TypesList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TypesList',
      component: TypesList
    }
  ]
})
