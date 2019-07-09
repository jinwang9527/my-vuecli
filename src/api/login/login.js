import request from '@/utils/request'


export function userLogin({account, password}) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}
export function getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
  })
}
export function getRoles() {
  return request({
    url: '/user/getRoles',
    method: 'post',
  })
}
export function selectPosts({pageIndex,pageSize}) {
  return request({
    url: '/myPosts/selectPosts',
    method: 'post',
    data:{
      pageIndex,
      pageSize}
  })
}
