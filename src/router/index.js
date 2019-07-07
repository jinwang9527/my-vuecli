import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import ssss from '@/components/ssss'
import notAuthority from './NotAuthority'
import HelloWord from '@/components/HelloWorld'
Vue.use(Router);


import HasNotAuthority from './HasNotAuthority'
import user from './user'
export const constantRouterMap = [
  notAuthority,
  {path: '/', component: HelloWord },
  {path: '/Users', name: 'Users', component: Users},
  {path: '/404', name: '404', component: ssss}
];

export const asyncRouterMap = [
  HasNotAuthority,
  user
];


export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
