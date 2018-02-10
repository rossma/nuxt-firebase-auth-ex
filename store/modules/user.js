import firebaseApp from '~/firebase/app'

export const state = () => ({
  uid: null
})

export const getters = {

  uid(state) {
    console.log('in uid:', state.uid)
    return state.uid
  },

  isAuthenticated(state) {
    console.log('in store.getters.isAuthenticated:', !!state.uid)
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

    // firebaseApp.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     console.log('[STORE ACTIONS] - user:', user)
    //   } else {
    //     console.log('[STORE ACTIONS] - user not signed in')
    //   }
    // })
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

// export default {
//   namespaced: true,
//
//   state: {
//     // {id, quantity}
//     items: [],
//     checkoutStatus: null
//   },
//
//   getters: {
//     cartProducts (state, getters, rootState, rootGetters) {
//       return state.items.map(cartItem => {
//         const product = rootState.products.items.find(product => product.id === cartItem.id)
//       return {
//         title: product.title,
//         price: product.price,
//         quantity: cartItem.quantity
//       }
//     })
//     },
//
//     cartTotal (state, getters) {
//       return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
//     },
//   },
//
//   mutations: {
//     pushProductToCart (state, productId) {
//       state.items.push({
//         id: productId,
//         quantity: 1
//       })
//     },
//
//     incrementItemQuantity (state, cartItem) {
//       cartItem.quantity++
//     },
//
//     setCheckoutStatus (state, status) {
//       state.checkoutStatus = status
//     },
//
//     emptyCart (state) {
//       state.items = []
//     }
//   },
//
//   actions: {
//     addProductToCart({state, getters, commit, rootState, rootGetters}, product) {
//       if (rootGetters['products/productIsInStock'](product)) {
//         const cartItem = state.items.find(item => item.id === product.id)
//         if (!cartItem) {
//           commit('pushProductToCart', product.id)
//         } else {
//           commit('incrementItemQuantity', cartItem)
//         }
//         commit('products/decrementProductInventory', product, {root: true})
//       }
//     },
//
//     checkout({state, commit}) {
//       shop.buyProducts(
//         state.items,
//         () => {
//         commit('emptyCart')
//       commit('setCheckoutStatus', 'success')
//     },
//       () => {
//         commit('setCheckoutStatus', 'fail')
//       }
//     )
//     }
//   }
// }
