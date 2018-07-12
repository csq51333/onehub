import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'

export default () => {
  return new Vuex.Store({
    state: defaultState, // 因为是要被服务端覆盖的数据，它不是直接用的，所以起个不一样的名字
    mutations,
    getters
  })
}
