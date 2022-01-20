import { GlobalDataProps } from '../store/index'
import { Module } from 'vuex'

export interface user {
  username: string
  password: string
}
const user: Module<user, GlobalDataProps> = {
  state: {
    username: '',
    password: ''
  },
  mutations: {
    login(state, payload) {
      state.username = payload.username
      state.password = payload.password
    },
    loginOut(state) {
      state.username = ''
      localStorage.removeItem('token')
    }
  }
}
export default user
