export const state = () => ({

})


export const actions = {

  async nuxtServerInit ({ dispatch }, { req }) {
    console.log('[STORE ACTION]- in nuxServerInit:', req.session)

    if (req.session && req.session.userId) {
      console.log(`[STORE ACTION] found uid in session:${JSON.stringify(req.session.userId)}`)
      await dispatch('saveUID', req.session.userId)
    }
  }

}

export const mutations = {

}

//
// export const mutations = {
//   increment (state) {
//     state.counter++
//   }
// }


//
// import Vuex from 'vuex'
// import Vue from 'vue'
// import actions from './actions'
// import cart from './modules/cart'
// import products from './modules/products'
//
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   modules: {
//     cart,
//     products
//   },
//
//   state: { // = data
//
//   },
//
//   getters: { // = computed properties
//
//   },
//
//   actions,
//
//   mutations: {
//
//   }
// })
