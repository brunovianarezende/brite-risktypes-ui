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

export default buildStore([{id: 1, name: 'TheName', description: 'The descriptionThe descriptionThe descriptionThe descriptionThe descriptionThe descriptionThe description'}])
