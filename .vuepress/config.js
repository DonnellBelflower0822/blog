const docMap = [
  {
    title: '基础',
    link: '/doc/',
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
  },
  {
    title: 'electron',
    link: '/electronjs/',
    children: [
      'base'
    ]
  }
];

const nav = docMap.map(({ title, link }) => ({ text: title, link }));
const sidebar = docMap.reduce((obj, { link, title, children }) => ({
  ...obj,
  [link]: [
    {
      title,
      children,
      collapsable: false
    }
  ]
}), {});

module.exports = {
  base: '/blog/dist/',
  dest: 'dist',
  locales: {
    '/': {
      lang: 'en-zh',
      title: '学习笔记',
      description: '天天向上'
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
        nav,
        sidebar
      }
    }
  }
};
