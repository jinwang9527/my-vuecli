import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import HelloWord from '@/components/HelloWorld'
Vue.use(Router);

import NotAuthority from './NotAuthority'
import HasNotAuthority from './HasNotAuthority'

export const constantRouterMap = [
  {path: '/', component: HelloWord },
  {path: '/Users', name: 'Users', component: Users}
];

export const asyncRouterMap = [
  NotAuthority,
  HasNotAuthority
];


export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
