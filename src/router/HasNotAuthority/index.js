import HasNotAuthority from '../../components/HasNotAuthority'
import hasAuthoritOfChildred from '../../components/hasAuthoritOfChildred'
import ssss from '../../components/ssss'
import user from '../../components/user'
import layout from '../../views/layout/Layout'
export default {
  path:'/a',
  name:'a',
  role:['admin'],
  redirect:'/a/HasNotAuthority',
  component:layout,
  children:[
    {
      path:'HasNotAuthority',
      name:'HasNotAuthority',
      component: HasNotAuthority
    },
    {
      path:'hasAuthoritOfChildred',
      name:'hasAuthoritOfChildred',
      component: hasAuthoritOfChildred,
      children:[
        {
          path:'user',
          name:'user',
          component: user,
          children:[
            {
              path:'ssss',
              name:'ssss',
              component: ssss,
            }
          ]
        },
      ]
    }
  ]
}
