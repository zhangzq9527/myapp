import { GlobalDataProps } from '../store/index'
import { Module } from 'vuex'

export interface user {
  user: {
    username: string
    password: string
    startTime: string
  }
}
const user: Module<user, GlobalDataProps> = {
  state: {
    user: {
      username: '',
      password: '',
      startTime: ''
    }
  },
  mutations: {
    login(state, payload) {
      state.user.username = payload.username
      state.user.password = payload.password
      state.user.startTime = payload.startTime
    }
  }
}
export default user
