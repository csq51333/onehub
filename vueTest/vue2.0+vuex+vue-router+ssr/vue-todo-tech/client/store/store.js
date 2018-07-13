import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev, // 使其在在开发模式下，除mmutations外不可修改state的值
    state: defaultState, // 因为是要被服务端覆盖的数据，它不是直接用的，所以起个不一样的名字
    mutations,
    getters,
    actions,
    // 模块功能：
    modules: {
      a: {
        state: {
          text: '我是aaaa模块下的text'
        },
        mutations: {
          upTextA (state, num) {
            console.log(state)
            state.text = num instanceof String ? num : 'aaaaa'
          }
        }
      },
      b: {
        state: {
          text: '我是bbbb模块下的text'
        }
      }
    }
  })
}
