import firebaseApp from '~/firebase/app'

export const state = () => ({
  uid: null
})

export const getters = {

  uid(state) {
    return state.uid
  },

  isAuthenticated(state) {
    return !!state.uid
  }
}


export const actions = {

  async login({dispatch, state}, uid) {
    console.log('[STORE ACTIONS] - login')
    const token = await firebaseApp.auth().currentUser.getIdToken(true)
    const {status} = await this.$axios.$post('/api/login', { uid: uid, token: token })

    await dispatch('saveUID', uid)
    console.log('[STORE ACTIONS] - in login, response:', status)

  },

  async logout({dispatch}) {
    console.log('[STORE ACTIONS] - logout')
    await firebaseApp.auth().signOut()

    await dispatch('saveUID', null)

    const {status} = await this.$axios.post('/api/logout')
    console.log('[STORE ACTIONS] - in logout, response:', status)
  },

  saveUID({commit}, uid) {
    console.log('[STORE ACTIONS] - saveUID')
    commit('saveUID', uid)
  }

}

export const mutations = {
  saveUID (state, uid) {
    console.log('[STORE MUTATIONS] - saveUID:', uid)
    state.uid = uid
  }
}
