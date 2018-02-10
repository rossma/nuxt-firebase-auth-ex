import jwtDecode from 'jwt-decode'

export default function ({store, req, app}) {
  if (process.server && !store.getters['modules/user/isAuthenticated']) {
    console.log('[CHECK-AUTH] - is server')

    let uid = getUserFromSession(req)
    console.log('user from session:', uid)
    if (!uid) {
      console.log('User not found in session, looking up in cookie')
      uid = getUserFromCookie(req)
    }

    if (uid) {
      console.log('User found, going to initialise the user object by uid in the store')
      store.dispatch('modules/user/saveUID', uid)
    }
  }
}

function getUserFromSession (req) {
  console.log('[CHECK-AUTH] - checking if user is stored in session')
  return req.session ? req.session.userId : null
}

function getUserFromCookie (req) {
  console.log('[CHECK-AUTH] - checking if user is stored in cookie')
  if (!req.headers.cookie) return

  const accessTokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('access_token='))
  if (!accessTokenCookie) return

  // https://firebase.google.com/docs/auth/admin/verify-id-tokens
  const accessToken = accessTokenCookie.split('=')[1]
  const decodedToken = jwtDecode(accessToken)
  if (!decodedToken) return

  if (new Date() > new Date(decodedToken.exp)) {
    console.log('[CHECK-AUTH] - token expired')
    return
  }

  return decodedToken.sub
}
