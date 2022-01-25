import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import Login, { user } from '../modules/Login'
import createPersistedState from 'vuex-persistedstate'

export interface GlobalDataProps {
  Login: user
}
export const key: InjectionKey<Store<GlobalDataProps>> = Symbol()
export const store = createStore<GlobalDataProps>({
  modules: {
    Login
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
export function useStore() {
  return baseUseStore(key)
}
