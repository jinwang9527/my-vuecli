import second from '../../views/view/second'
import first from '../../views/view/first'
import Layout from '../../views/layout/Layout'
export default {
  path:'/view',
  name:'view',
  redirect:'/view/first',
  meta: { title: '主页列表', },
  component:Layout,
  children:[
    {
      path:'first',
      name:'first',
      meta: { title: '第一个页面' },
      component:first
    },
    {
      path:'second',
      name:'second',
      meta: { title: '第二个页面' },
      component:second
    }
  ]
}
