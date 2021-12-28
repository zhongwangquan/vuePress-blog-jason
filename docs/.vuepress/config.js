const path = require('path')
module.exports = {
  // 页面标题
  title: 'jason 前端小院',
  // 网页描述
  description: '兴趣是最好的老师',
  head: [
    // 页面icon
    ['link', {
      rel: 'icon',
      href: '/dog.jpg'
    }]
  ],
  // 端口号
  port: 3000,
  markdown: {
    // 代码块行号
    lineNumbers: true
  },
  themeConfig: {
    // 最后更新时间
    lastUpdated: '最后更新时间',
    // 所有页面自动生成侧边栏
    // sidebar: 'auto',
    // 仓库地址
    repo: '',
    // 仓库链接label
    repoLabel: 'Github',
    // 编辑链接
    editLinks: true,
    // 编辑链接label
    editLinkText: '编辑此页',
    // 导航
    nav: [{
        text: '文章列表',
        link: '/notes/Notes'
      },
    ],
    sidebar: {
      '/notes/': [
        {
          title: 'JavaScript',
          collapsable: true,
          children: [
            '/notes/javaScript/constructor',
            '/notes/javaScript/prototype',
            '/notes/javaScript/inherit',
            '/notes/javaScript/deepCopy',
            '/notes/javaScript/this',
            '/notes/javaScript/event',
            '/notes/javaScript/propagation',
            '/notes/javaScript/cookie',
            '/notes/javaScript/array-api',
          ]
      },
        {
          title: 'TypeScript',
          collapsable: true,
          children: [
            '/notes/typescript/base',
          ]
      },
        {
          title: 'Vue',
          collapsable: true,
          children: [
            '/notes/vue/vuex',
          ]
      },
        {
          title: 'React',
          collapsable: true,
          children: [
            '/notes/react/redux',
            '/notes/react/redux-connect',
          ]
      },
        {
          title: '动画',
          collapsable: true,
          children: [
            '/notes/animation/compare-ani',
          ]
      },
        {
          title: '服务器',
          collapsable: true,
          children: [
            '/notes/server/Jenkins',
            '/notes/server/nginx',
          ]
      },
        {
          title: '随笔',
          collapsable: true,
          children: [
            '/notes/note/record1',
          ]
      },

      ]
    },
    sidebarDepth: 0, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
  },
  configureWebpack: {
    resolve: {
      // 静态资源的别名
      alias: {
        '@learning': path.resolve(__dirname, '../images/learning')

      }
    }
  },
}