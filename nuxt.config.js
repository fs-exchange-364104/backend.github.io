require('dotenv').config();
const colors = require('vuetify/es5/util/colors').default;
const admin = require('firebase-admin');
const serviceAccount = require('./service-accountt.json');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  });
}

module.exports = {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  publicRuntimeConfig: {
    apiKey: 'AIzaSyD_Q4SEux2JXbQgvkLtyhhm7ze-eMjaXuk',
    authDomain: 'fs-exchange-364104.firebaseapp.com',
    databaseURL: 'https://fs-exchange-364104-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'fs-exchange-364104',
    storageBucket: 'fs-exchange-364104.appspot.com',
    messagingSenderId: '161750353077',
    appId: '1:161750353077:web:a804ca626aaa0a9f356afc',
    measurementId: 'G-FDHE2GSQL5'
  },

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE-edge' },
      { httpEquiv: 'X-UA-Compatible', content: 'Chrome/100.0.0.0' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
      { ref: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { ref: 'stylesheet', href: 'https://materialdesignicons.com/icon' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/vuetify.js', ssr: true },
    { src: '~/plugins/firebase-client-init.js', ssr: false }
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    '@nuxtjs/dotenv',
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyD_Q4SEux2JXbQgvkLtyhhm7ze-eMjaXuk',
      authDomain: 'fs-exchange-364104.firebaseapp.com',
      databaseURL: 'https://fs-exchange-364104-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'fs-exchange-364104',
      storageBucket: 'fs-exchange-364104.appspot.com',
      messagingSenderId: '161750353077',
      appId: '1:161750353077:web:a804ca626aaa0a9f356afc',
      measurementId: 'G-FDHE2GSQL5'
    },
    services: {
      auth: {
        persistence: 'session',
        initialize: {
          ssr: true
        }
      },
      database: true,
      storage: true,
      firestore: true,
      functions: true
    },
    onFirebaseHosting: false
  },

  env: {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    BASE_URL: process.env.BASE_URL,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS || '~/service-accountt.json',
    DATABASE_URL: process.env.DATABASE_URL,
    LINE_LOGIN_CHANNEL_ID: process.env.LINE_LOGIN_CHANNEL_ID,
    LINE_LOGIN_CHANNEL_SECRET: process.env.LINE_LOGIN_CHANNEL_SECRET,
    LINE_LOGIN_CALLBACK_URL: process.env.LINE_LOGIN_CALLBACK_URL,
    MB_ACCESS_KEY: process.env.MB_ACCESS_KEY,
    MB_LINE_CHANNEL_ID: process.env.MB_LINE_CHANNEL_ID,
    MB_API_URL: process.env.MB_API_URL
  },

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },

  /*
  ** For deployment you might want to edit host and port
  */
  server: {
    port: process.env.PORT, // default: 3000
    host: process.env.HOST // default: localhost
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, ctx) {}
  }
};
