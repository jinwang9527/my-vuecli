import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/login'
import notFount from '../views/404/notFount'
import test from './test'

Vue.use(Router);


export const constantRouterMap = [
  test,
  {path: '/', component: login},
  {path: '/404', name: '404', component:notFount}
];

export const asyncRouterMap = [];


export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
