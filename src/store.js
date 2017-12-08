import Vue from 'vue'
import Vuex from 'vuex'
import {getApi} from './api'

Vue.use(Vuex)

export const buildStore = (types = []) => {
  return new Vuex.Store({
    state: {
      types
    },
    mutations: {
      setTypes (state, payload) {
        state.types = payload
      }
    },
    actions: {
      hydrate (context, payload) {
        getApi().searchTypes()
          .then((types) => {
            context.commit('setTypes', types)
          })
      }
    }
  })
}

export default buildStore([])
