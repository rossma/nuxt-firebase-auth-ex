const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-firebsae-auth-ex',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js and Firebase Authentication Example Application' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (isDev) {
        config.resolve.alias['config'] = '~/config/development'
      } else {
        config.resolve.alias['config'] = '~/config/production'
      }
    }
  },
  plugins: [
    '~/plugins/auth.js'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    debug: true
  },
  router: {
    middleware: 'check-auth'
  },
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'amdskfmdlkfdklfndfmdfndsmfndfnejnjheheuewytwgssa',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000, secure: false }
    }),
    '~/api'
  ]
}
