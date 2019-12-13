const webpack = require('webpack')

module.exports = {
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  env: {
    apiUrl: 'http://blog.layadmin.cn', // 后端api接口地址
    homeUrl: 'https://localhost:3001' //前端域名
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'layBlog-ui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'vue|博客' },
      { hid: 'description', name: 'description', content: 'layBlog-ui是开源的前端博客系统，基于它你能更快速的打造一套功能完备的商业级新媒体网站' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#44C1B8', height: '4px' },
  vender:[
    'element-ui', 'axios', '~untils/index.js'
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css',
    {src: '@/static/css/layui.css', lang: 'css'},
    {src: '@/static/css/layui-mobile.css', lang: 'css'},
    {src: '@/static/css/style.css', lang: 'css'},
    {src: '@/static/css/layadmin.css', lang: 'css'}

  ],
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/vue-cookie', ssr: true }

  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['wangeditor'],
    build: {
      vendor: ['element-ui', 'axios', 'Button', 'Input', 'Tabs', 'Message', 'TabPane', 'Row', 'Col', 'Loading', 'Notification', 'Icon', 'Carousel', 'Tag']
    },
    analyze: false,
    plugins: [
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${['javascript', 'css', 'php', 'sql', 'python', 'bash'].join('|')})$`),
      )
    ],
    babel: {
      plugins: [['component', [{
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }]]],
      comments: true
    },
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
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    ['/api', { target: 'http://blog.layadmin.cn' }]
  ]
}
