import jwtDecode from 'jwt-decode'

export default function ({store, req}) {
  if (process.server && !store.getters['modules/user/isAuthenticated']) {
    let uid = getUserFromSession(req)
    if (!uid) {
      uid = getUserFromCookie(req)
    }
    if (uid) {
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
