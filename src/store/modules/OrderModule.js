import { putOrder, getOrder } from './../../api/order'

export default{
  state: {

  },
  mutations: {},
  actions: {
    putOrder({ commit }, data) {
      return new Promise((resolve, reject) => {
        putOrder(data).then(res => {
          console.log(res.data)
          resolve(res.data)
        })
      })



      return Axios.post(url, data).then(res=>{
        console.log(res.data)
        if(!res.data['status']){
          console.log(res.data)
        }else{
          console.log(res.data)
          context.commit('setVideoData', {key:"payUrl", data:res.data['order_pay_url']})
        }

      })
    },
  },
  getters: {}
}