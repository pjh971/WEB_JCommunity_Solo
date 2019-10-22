import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    sb: {
      act: false,
      msg: '',
      color: 'error'
    },
    user: {
      name: '비로그인',
      company: '비로그인'
    }
  },
  mutations: {
    getToken (state) {
      state.token = localStorage.getItem('token')
    },
    setUser (state, user) {
      state.user.name = user.name
      state.user.company = user._company.name
    },
    delToken (state) {
      localStorage.removeItem('token')
      state.token = null
      state.user = {
        name: '비로그인',
        company: '비로그인'
      }
    },
    pop (state, d) {
      state.sb.msg = d.msg
      state.sb.color = d.color
      state.sb.act = false
      if (d.act === undefined) state.sb.act = true
    }
  },
  actions: {

  }
})
