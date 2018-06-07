import request from './../utils/request'
export function getCoupon(data) {
  return request({
    url: '/api/coupon/getcoupon',
    method: 'post',
    data
  })
}
export function checkCourses(data) {
  return request({
    url: '/api/product/checkcourses',
    method: 'post',
    data
  })
}
export function getOrder(data) {
  return request({
    url: '/api/order/get-order',
    method: 'post',
    data

  })
}
export function putOrder(data) {
  return request({
    url: '/api/order/put-order',
    method: 'post',
    data
  })
}