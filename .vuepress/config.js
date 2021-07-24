module.exports = {
  title: '前端博客',
  base: '/web/',
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
          ]
        },
        {
          title: 'ES-高级',
          path: '/basic/es-adv/',
          children: [
            '/basic/es-adv/',
            '/basic/es-adv/context',
            '/basic/es-adv/async',
          ]
        }
      ],
      '/frame/': [],
      '/browser/': [],
      '/engine/': [],
      '/http/': [],
      '/algorithm/': [],
    }
  }
};
