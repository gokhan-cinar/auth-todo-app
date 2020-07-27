import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    apiKey: 'AIzaSyDKaDLCVBaTfd1FZImq-F4Qjn8KSBZ-xZI'
  },
  getters: {
    isAuthenticated (state) {
      return state.token !== ''
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    clearToken (state) {
      state.token = ''
    }
  },
  actions: {
    initAuth ({ commit, dispatch }) {
      let token = localStorage.getItem('token')
      if (token) {

        let expirationDate = localStorage.getItem('expiteDate')
        let nowDate = new Date().getTime()

        if (nowDate >= +expirationDate) {
          console.log('token expire')
          dispatch('logOut')
        } else {
          commit('setToken', token)
          let timerSecond = +expirationDate - nowDate
          dispatch('setTimeOut', timerSecond)
          console.log('timerSecond: ', timerSecond)
          router.push('/')
        }
      } else {
        router.push('/auth').catch(err => console.log(':', err))
      }

    },

    login ({ commit, dispatch, state }, autData) { // eslint-disable-line no-unused-vars
      let authLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

      if (autData.isUser) {
        authLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      }
      return axios.post(authLink + 'AIzaSyDKaDLCVBaTfd1FZImq-F4Qjn8KSBZ-xZI', {
        email: autData.email,
        password: autData.password,
        returnSecureToken: true
      })
        .then(response => {
          commit('setToken', response.data.idToken)
          localStorage.setItem('token', response.data.idToken)
          // localStorage.setItem('expiteDate', new Date().getTime() + +response.date.expiresIn * 1000)
          localStorage.setItem('expiteDate', new Date().getTime() + 990000)
          // dispatch('setTimeOut', +response.data.expiresIn * 1000)
          dispatch('setTimeOut', 299000)
        })
        .catch(error => console.log('error ', error))
    },
    logOut ({ commit }) {
      commit('clearToken')
      localStorage.removeItem('token')
      localStorage.removeItem('expiteDate')
      router.replace('/auth')
    },
    setTimeOut ({ dispatch }, exTime) {
      setTimeout(() => {
        dispatch('logOut')
      }, exTime)
    }
  },
  modules: {
  }
})
