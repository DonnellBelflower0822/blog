module.exports = {
  title: '前端博客',
  base: '/web/',
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
        }
      ],
      '/frame/': [
        {
          title: 'React',
          path: '/frame/react/',
          children: [
            '/frame/react/',
            '/frame/react/my-react',
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
        }
      ],
      '/http/': [],
      '/algorithm/': [],
    }
  }
};
