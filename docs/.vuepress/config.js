module.exports = {
  title: '答案的前端博客',
  base: '/blog/',
  dest: './dist',
  themeConfig: {
    sidebarDepth: 3,
    nav: [
      { text: '基础篇', link: '/basic/' },
      { text: '框架篇', link: '/frame/' },
      { text: '工程化', link: '/engine/' },
      { text: '基础知识', link: '/browser/' },
      // { text: '算法', link: '/algorithm/' },
      // { text: '解决方案', link: '/solutions/' },
      // { text: 'node', link: '/node-md/' },
      { text: '简历', link: '/resume' },
    ],
    sidebar: {
      '/basic/': [
        '/basic/',
        '/basic/tranform',
        '/basic/grammar',
        '/basic/function',
        '/basic/async',
        '/basic/array',
        '/basic/object',
        '/basic/context',
        '/basic/scope',
        '/basic/this',
        '/basic/prototype',
        '/basic/write',
        '/basic/cg',
        '/basic/question',
        '/basic/ts',
        '/basic/css',
      ],
      '/frame/': [
        {
          title: 'React',
          path: '/frame/react/',
          children: [
            '/frame/react/',
            '/frame/react/tiny-react',
            '/frame/react/tiny-react-fiber',
            '/frame/react/redux',
            '/frame/react/dva',
          ]
        },
        {
          title: 'vue',
          path: '/frame/vue/',
          children: [
            '/frame/vue/',
            '/frame/vue/my-vue2',
            '/frame/vue/my-vue2-router',
            '/frame/vue/my-vue2-vuex',
            '/frame/vue/my-vue2-ssr',
            '/frame/vue/my-vue3',
          ]
        },
        '/frame/qiankun/',
      ],
      '/browser/': [
        '/browser/',
        '/browser/eventloop',
        '/browser/preforement',
        '/browser/request',
        '/browser/http',
      ],
      '/engine/': [
        '/engine/modules',
        '/engine/',
        '/engine/my-webpack',
        '/engine/cli',
        '/engine/vite-doc',
        '/engine/log',
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
        '/node-md/',
        '/node-md/ci-cd'
      ],
      '/algorithm/': [],
    }
  }
};
