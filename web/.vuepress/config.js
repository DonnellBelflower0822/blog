module.exports = {
  title: '前端博客',
  base: '/blog/',
  dest: './docs',
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
          title: 'ES-基础',
          path: '/basic/es-basic/',
          children: [
            '/basic/es-basic/',
            '/basic/es-basic/transform',
            '/basic/es-basic/object',
            '/basic/es-basic/array',
            '/basic/es-basic/function',
            '/basic/es-basic/question',
          ]
        },
        {
          title: 'ES-高级',
          path: '/basic/es-adv/',
          children: [
            '/basic/es-adv/',
            '/basic/es-adv/context',
            '/basic/es-adv/async',
            '/basic/es-adv/cg',
          ]
        },
        {
          title: 'TS',
          path: '/basic/ts/',
          children: [
            '/basic/ts/',
          ]
        },
        {
          title: 'html/css',
          path: '/basic/html-css/',
          children: [
            '/basic/html-css/',
          ]
        }
      ],
      '/frame/': [
        {
          title: 'React',
          path: '/frame/react/',
          children: [
            '/frame/react/',
            '/frame/react/my-react',
            '/frame/react/hook',
            '/frame/react/my-redux',
            // '/frame/react/my-router',
            '/frame/react/optimize',
            '/frame/react/fiber',
            '/frame/react/immutable',
          ]
        },
        {
          title: 'Vue',
          path: '/frame/vue/',
          children: [
            '/frame/vue/',
            '/frame/vue/my-vue2',
            '/frame/vue/my-vue2-router',
            '/frame/vue/my-vue2-vuex',
            '/frame/vue/my-vue2-ssr',
            '/frame/vue/my-vue3',
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
          path: '/engine/webpack/',
          children: [
            '/engine/webpack/',
            '/engine/webpack/my-webpack',
          ]
        },
        {
          title: 'vite',
          path: '/engine/vite/',
          children: [
            '/engine/vite/',
          ]
        },
        {
          title: 'monorepo',
          path: '/engine/monorepo/',
          children: [
            '/engine/monorepo/',
          ]
        }
      ],
      '/http/': [
        {
          title: 'http',
          path: '/http/http/',
          children: [
            '/http/http/',
          ]
        }
      ],
      '/algorithm/': [],
    }
  }
};
