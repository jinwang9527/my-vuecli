import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import store from './store'

const whiteList = ['/login', '/ForgetPassword']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/login') {
//    next({ path: '/' });
    next({path: '/'});
    NProgress.done();
  }

});

router.afterEach((to, from, next) => {
  NProgress.done();

});

