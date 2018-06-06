import { loadCart, checkCourses } from "../../api/cart"
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
  },
  getters: {
    cartInfo: state => state.cartInfo,
    orderInfo: state => state.orderInfo
  }
}