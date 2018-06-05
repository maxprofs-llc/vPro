import request from './../utils/request'
export function userLogin(data) {
  return request({
    method: 'post',
    url: '/api/auths',
    data
  })
}

