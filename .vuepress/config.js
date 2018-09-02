module.exports = {
  base: '/inventory/dist/',
  dest: 'dist',
  locales: {
    '/': {
      lang: 'en-zh',
      title: '学习笔记',
      description: '我要好好'
    }
  },
  themeConfig: {
    sidebarDepth: 3,
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用',
            buttonText: '刷新'
          }
        },
        nav: [
          {
            text: '指南',
            link: '/doc/',
          },
          {
            text: '笔记',
            link: '/note/',
          },
          {
            text: '联系我',
            link: '/concat/'
          }
        ],
        sidebar: {
          '/doc/': genSidebarConfig('指南'),
          '/note/': genSidebarConfig1('笔记'),
        }
      }
    }
  }
}
function genSidebarConfig1 (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'base',
        'oop',
        'dom',
        'bom'
      ]
    }
  ]
}
function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'JS',
        'OOP',
        'DOM',
        'CSS',
        'blog',
        'vue',
        'mp',
        'HTTP',
        'arithmetic',
      ]
    }
  ]
}