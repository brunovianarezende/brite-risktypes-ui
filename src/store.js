import Vue from 'vue'
import Vuex from 'vuex'
import {getApi} from './api'

Vue.use(Vuex)

export const buildStore = (types = [], insurances = []) => {
  return new Vuex.Store({
    state: {
      types, insurances
    },
    mutations: {
      setTypes (state, payload) {
        state.types = payload
      },
      addInsurance (state, payload) {
        state.insurances.push(payload)
      }
    },
    actions: {
      hydrate (context, payload) {
        getApi().searchTypes()
          .then((types) => {
            context.commit('setTypes', types)
          })
      },
      addInsurance (context, payload) {
        getApi().addInsurance(payload)
          .then((id) => {
            payload.id = id
            context.commit('addInsurance', payload)
          })
      }
    }
  })
}

export default buildStore([], [])
