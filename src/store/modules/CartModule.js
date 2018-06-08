import { loadCart, addCart, checkCourses } from "../../api/cart"
export default{
  state: {
    cartInfo: [],
    orderInfo: []
  },
  mutations: {
    SET_CARTINFO(state, data) {
      state['cartInfo'] = data
    },
    SET_ORDERINFO(state, data) {
      state['orderInfo'] = data
    }
  },
  actions: {
    loadCart(context, data){
      return new Promise((resolve, reject) => {
        loadCart(data).then(res => {
          context.commit('SET_CARTINFO', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    checkCourses({ commit }, data){
      return new Promise((resolve, reject) => {
        checkCourses(data).then(res => {
          commit('SET_ORDERINFO', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addToCart(context, data) {
      return new Promise((resolve, reject) => {
        addCart(data).then((res) => {
          console.log(res)
        })
      })





      return Axios.post(url,data).then(res=>{
        if(res.data.hasOwnProperty("status")){
          if(res.data.status){
            context.commit('delCartInfo', {key:"cartInfo",course_id:res.data.course_id})
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  getters: {
    cartInfo: state => state.cartInfo,
    orderInfo: state => state.orderInfo
  }
}