import request from './../utils/request'

export function loadCart(data) {
  return request({
    'url': "/api/cart/usercart",
    'method': "post",
    data
  })
}
export function checkCourses(data) {
  return request({
    'url': '/api/product/checkcourses',
    'method': 'post',
    data
  })
}