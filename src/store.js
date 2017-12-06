import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const buildStore = (types = []) => {
  return new Vuex.Store({
    state: {
      types
    }
  })
}

export default buildStore([])
