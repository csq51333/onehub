import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 使其在在开发模式下，除mmutations外不可修改state的值
    state: defaultState, // 因为是要被服务端覆盖的数据，它不是直接用的，所以起个不一样的名字
    mutations,
    getters,
    actions
    // 模块功能：
    // modules: {
    //   a: {
    //     namespaced: true, // 加入这个属性作用域独立，可以在每个模块下起相同名字的函数....mapMutations(['a/upTextA'])
    //     state: {
    //       text: 13
    //     },
    //     mutations: {
    //       upTextA (state, num) {
    //         state.text = num instanceof String ? num : num.num + state.text
    //         console.log(num)
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState, rootGetters) {
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) {
    //         // 参数ctx相当于store，ctx也可直接解构{state, commit, rootState}这样拿
    //         commit('updateCount', {num: 88}, { root: true })
    //         console.log('state.text')
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: '我是bbbb'
    //     },
    //     mutations: {
    //       conso () {
    //         console.log('b模块')
    //       }
    //     },
    //     actions: {
    //       acB ({ commit }) {
    //         commit('updateCount', {num2: 8888888888888})
    //       },
    //       ctxs (ctx) {
    //         console.log(ctx)
    //       }
    //     }
    //   },
    //   c: {
    //     namespaced: true,
    //     actions: {
    //       show ({ commit }) {
    //         commit('conso', '', { root: true })
    //       }
    //     }
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
