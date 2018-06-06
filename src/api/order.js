import request from './../utils/request'
export function getCoupon(data) {
  return request({
    url: '/api/coupon/getcoupon',
    method: 'post',
    data
  })
}