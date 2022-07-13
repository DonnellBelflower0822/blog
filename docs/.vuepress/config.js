module.exports = {
  title: '许晓周的前端博客',
  base: '/blog/',
  dest: './dist',
  themeConfig: {
    sidebarDepth: 3,
    nav: [
      { text: '基础篇', link: '/basic/' },
      { text: '框架篇', link: '/frame/' },
      { text: '浏览器', link: '/browser/' },
      { text: '工程化', link: '/engine/' },
      { text: 'http', link: '/http/' },
      { text: '跨端', link: '/crossEnd/' },
      { text: '算法', link: '/algorithm/' },
      { text: '解决方案', link: '/solutions/' },
      { text: 'node', link: '/node-md/' },
      { text: '简历', link: '/resume' },
    ],
    sidebar: {
      '/basic/': [
        {
          title: 'ES',
          path: '/basic/es/',
          children: [
            '/basic/es/',
            '/basic/es/function',
            '/basic/es/async',
            '/basic/es/array',
            '/basic/es/object',
            '/basic/es/context',
            '/basic/es/scope',
            '/basic/es/this',
            '/basic/es/prototype',
            '/basic/es/cg',
          ]
        },
        {
          title: 'TS',
          path: '/basic/ts-md/',
          children: [
            '/basic/ts-md/',
          ]
        },
        {
          title: 'html-css',
          path: '/basic/html-css/',
          children: [
            '/basic/html-css/',
            '/basic/html-css/layout',
            '/basic/html-css/adapted',
          ]
        }
      ],
      '/frame/': [
        {
          title: 'React',
          path: '/frame/react-md/',
          children: [
            '/frame/react-md/',
            '/frame/react-md/my-react',
            '/frame/react-md/hook',
            '/frame/react-md/my-redux',
            // '/frame/react/my-router',
            '/frame/react-md/optimize',
            '/frame/react-md/fiber',
            '/frame/react-md/immutable',
          ]
        },
        {
          title: 'Vue',
          path: '/frame/vue-md/',
          children: [
            '/frame/vue-md/',
            '/frame/vue-md/my-vue2',
            '/frame/vue-md/my-vue2-router',
            '/frame/vue-md/my-vue2-vuex',
            '/frame/vue-md/my-vue2-ssr',
            '/frame/vue-md/my-vue3',
          ]
        }
      ],
      '/browser/': [
        {
          title: '浏览器',
          path: '/browser/browser/',
          children: [
            '/browser/browser/',
            '/browser/browser/render',
            '/browser/browser/storage',
            '/browser/browser/event',
            '/browser/browser/cache',
          ]
        },
        {
          title: 'event-loop',
          path: '/browser/event-loop/',
          children: [
            '/browser/event-loop/',
          ]
        },
        {
          title: '性能优化',
          path: '/browser/preforement/',
          children: [
            '/browser/preforement/',
          ]
        },
      ],
      '/engine/': [
        {
          title: 'webpack',
          path: '/engine/webpack-md/',
          children: [
            '/engine/webpack-md/',
            '/engine/webpack-md/principle',
            '/engine/webpack-md/my-webpack',
            '/engine/webpack-md/modules',
          ]
        },
        {
          title: 'rollup',
          path: '/engine/rollup-md/',
          children: [
            '/engine/rollup-md/',
          ]
        },
        {
          title: 'vite',
          path: '/engine/vite-md/',
          children: [
            '/engine/vite-md/',
          ]
        },
        {
          title: '工程化',
          path: '/engine/engine/',
          children: [
            '/engine/engine/',
            '/engine/engine/cli',
            '/engine/engine/monorepo',
          ]
        },
        {
          title: 'git',
          path: '/engine/git/',
          children: [
            '/engine/git/',
          ]
        }
      ],
      '/http/': [
        {
          title: 'http',
          path: '/http/http/',
          children: [
            '/http/http/',
            '/http/http/http',
            '/http/http/request',
          ]
        },
        {
          title: '请求',
          path: '/http/request/',
          children: [
            '/http/request/',
            '/http/request/axios',
          ]
        },
        {
          title: '安全',
          path: '/http/safe/',
          children: [
            '/http/safe/',
            '/http/safe/xss',
            '/http/safe/crsf',
          ]
        }
      ],
      '/crossEnd/': [
        {
          title: 'pc客户端',
          path: '/crossEnd/electron-md/',
        },
        {
          title: '小程序',
          path: '/crossEnd/miniapp/',
          children: [
            '/crossEnd/miniapp/',
            '/crossEnd/miniapp/taro',
            '/crossEnd/miniapp/uniapp',
          ]
        }
      ],
      '/solutions/': [
        {
          title: '表单方案',
          path: '/solutions/form'
        },
        {
          title: 'react全家桶方案',
          path: '/solutions/react-family-fucket'
        },
        {
          title: 'react移动端ui方案',
          path: '/solutions/react-mobile-ui'
        },
        {
          title: '微前端',
          path: '/solutions/micro/',
          children: [
            '/solutions/micro/',
            '/solutions/micro/spa',
            '/solutions/micro/qiankun',
          ]
        }
      ],
      '/node-md/': [
        {
          title: '中台',
          path: '/node-md/'
        },
        {
          title: 'ci-cd',
          path: '/node-md/ci-cd'
        },
      ],
      '/algorithm/': [],
    }
  }
};
