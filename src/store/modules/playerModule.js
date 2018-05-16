import { agree, reject } from './../../api/comment'
export default{
  state: {
    playerInfo: {
      lessonsList: []
    }
  },
  mutations: {
    SET_LESSONSLIST(state, data) {

    }
  },
  actions: {
    getCourseLessonsList() {
      return new Promise((resolve, reject) => {
        getCourseLessonsList().then(res => {

        })
      })
    },
    agree({ commit }, data) {
      return new Promise((resolve, reject) => {
        agree(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    reject({ commit }, data) {
      return new Promise((resolve, reject) => {
        reject(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  getters:{}
}