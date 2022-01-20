import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import Login, { user } from '../modules/Login'

export interface GlobalDataProps {
  Login: user
}
export const key: InjectionKey<Store<GlobalDataProps>> = Symbol()
export const store = createStore<GlobalDataProps>({
  modules: {
    Login
  }
})
export function useStore() {
  return baseUseStore(key)
}
