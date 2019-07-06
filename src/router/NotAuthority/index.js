import NotAuthority from '../../components/NotAuthority'
export default {
  path:'/NotAuthority',
  name:'NotAuthority',
  redirect:'/Authority,',
  children:[
    {
      path:'/Authority',
      name:'Authority',
      component:NotAuthority
    }
  ]
}
