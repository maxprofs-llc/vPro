import { agree, oppose, getComment, setComment, getCommentSupportRate } from './../../api/comment'
export default{
  state: {
    comments: [],
    commentSupportRate: []
  },
  mutations: {
    SET_COMMENTS(state, data) {
      state['comments'] = data
    },
    SET_COMMENTSUPPORTRATE(state, data) {
      state['commentSupportRate'] = data
    }
  },
  actions: {
    agree({ commit }, data) {
      return new Promise((resolve, reject) => {
        agree(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    oppose({ commit }, data) {
      return new Promise((resolve, reject) => {
        oppose(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getComment({ commit }, data) {
      return new Promise((resolve, reject) => {
        getComment(data).then(res => {
          commit('SET_COMMENTS', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getCommentSupportRate({ commit }, data) {
      return new Promise((resolve, reject) => {
        getCommentSupportRate(data).then(res => {
          commit('SET_COMMENTSUPPORTRATE', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    setComment(context, data) {
      return new Promise((resolve, reject) => {
        data['user_id'] = context.getters['auth_id']
        console.log(data)
        setComment(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters:{}
}