module.exports = {
  title: '前端博客',
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
      { text: '算法', link: '/algorithm/' },
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
            '/basic/es/cg',
          ]
        },
        // {
        //   title: 'ES-高级',
        //   path: '/basic/es-adv/',
        //   children: [
        //     '/basic/es-adv/',
        //     '/basic/es-adv/context',
        //     '/basic/es-adv/async',
        //     '/basic/es-adv/cg',
        //   ]
        // },
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
            '/browser/browser/preforement',
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
          title: 'dom',
          path: '/browser/dom/',
          children: [
            '/browser/dom/',
          ]
        }
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
          title: 'vite',
          path: '/engine/vite-md/',
          children: [
            '/engine/vite-md/',
          ]
        },
        {
          title: 'monorepo',
          path: '/engine/monorepo-md/',
          children: [
            '/engine/monorepo-md/',
          ]
        }
      ],
      '/http/': [
        {
          title: 'http',
          path: '/http/http/',
          children: [
            '/http/http/',
            '/http/http/request',
          ]
        }
      ],
      '/algorithm/': [],
    }
  }
};
