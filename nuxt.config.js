import axios from 'axios'

const apiPath = 'https://kbystty-portfolio-back.herokuapp.com/api'
// const apiPath = 'http://localhost:8000/api'

export default {
  srcDir: 'app/',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    titleTemplate(title) {
      return (title ? `${title} | ` : '') + 'Portfolio'
    },
    htmlAttrs: {
      lang: 'ja-JP'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'noindex' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/sass/app.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api/': {
      target: apiPath,
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    async routes() {
      return await axios.get(apiPath + '/post').then(res => {
        return res.data.map((post) => {
          return {
            route: '/blog/post/' + post.id,
            payload: post
          }
        })
      })
    }
  }
}
