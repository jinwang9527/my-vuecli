import router, {asyncRouterMap} from './router'
import NProgress from 'nprogress' // Progress 进度条
import store from './store'
import {getToken} from './utils/auth'
import {constantRouterMap} from './router'

const whiteList = ['/login', '/ForgetPassword']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
   if (getToken()){
     if (to.path === '/login') {
       next({path: '/'});
       NProgress.done();
     }else  {
       if (store.getters.userInfo === null){
         store.dispatch("GetUserInfo").then(resolve =>{
           store.dispatch("getRoles").then(res=>{
             store.dispatch("filterAsyncRouter",res).then(role=>{
               router.addRoutes(role);
               router.addRoutes([{path:'/**',redirect:'/404'}]);
               console.log(role)
               next()
             })
           })
         })
       }else {
         next()
       }
     }
   }else if (whiteList.indexOf(to.path) === -1) {
     next()
     NProgress.done()
   } else  {
     next({path:'/'}) // 否则全部重定向到登录页
     NProgress.done()
   }
});

router.afterEach(() => {
  NProgress.done();
});

