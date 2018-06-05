import { loadCategory, getPage, getNavTree } from './../../api/category'
import Vue from 'vue'
export default{
  state: {
    coursesList: [],
    pagination: -1,
    navTree: [],
    categoryCrumb: []
  },
  mutations: {
    SET_COURSESLIST(state, data) {
      state['coursesList'] = data
    },
    SET_PAGINATION(state, data) {
      state['pagination'] = data
    },
    SET_NAVTREE(state, data)
    {
      state['navTree'] = data
    },
    SET_CATEGORYCRUMB(state, data)
    {
      state['categoryCrumb'] = data
    }
  },
  actions: {
    loadCategories({ commit }, { nav, page=1 }){
      let loading = Vue.prototype.$loading({
        text: '正在加载中'
      });
      return new Promise((resolve, reject) => {
        loadCategory({ category: nav, p: page }).then((res) => {
          loading.close()
          commit('SET_COURSESLIST', res.data)
          resolve(res.data)
        }).catch( err => {
          loading.close()
          reject(err)
        })
      })
    },
    clearCategories({ commit }) {
      commit('SET_COURSESLIST', [])
    },
    getPage({ commit }, { nav }) {
      return new Promise((resolve, reject) => {
        getPage({ category: nav }).then(res => {
          commit('SET_PAGINATION', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getNavTree({ commit })
    {
      return new Promise((resolve, reject) => {
        getNavTree().then(res => {
          console.log(res)
          commit('SET_NAVTREE', res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    setCategoryCrumb({ commit }, data) {
      commit('SET_CATEGORYCRUMB', data)
    }
  },
  getters: {
    coursesList: state => state.coursesList,
    pagination: state => parseInt(state.pagination),
    navTree: state => state.navTree,
    categoryCrumb: state => state.categoryCrumb
  }
}