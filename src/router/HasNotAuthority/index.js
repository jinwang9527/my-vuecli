import HasNotAuthority from '../../components/HasNotAuthority'
export default {
  path:'/Authority',
  name:'Authority',
  redirect:'/HasNotAuthority,',
  children:[
    {
      path:'/HasNotAuthority',
      name:'HasNotAuthority',
      component:HasNotAuthority
    }
  ]
}
