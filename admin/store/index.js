// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
import * as actions from './actions'
import moduleChat from './chat'
import moduleUser from './user'

export default {
  namespaced: true,
//   state,
//   getters,
//   mutations,
  actions,
  modules: {
    chat: moduleChat,
    user: moduleUser
  }
}