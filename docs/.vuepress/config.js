module.exports = {
  // 页面标题
  title: 'jason 前端小院',
  // 网页描述
  description: '兴趣是最好的老师',
  head: [
    // 页面icon
    ['link', { rel: 'icon', href: '/dog.jpg' }]
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
    sidebar: 'auto',
    // 仓库地址
    repo: 'https://github.com/zhongwangquan/vuePress-blog-jason',
    // 仓库链接label
    repoLabel: 'Github',
    // 编辑链接
    editLinks: true,
    // 编辑链接label
    editLinkText: '编辑此页',
    // 导航
    nav: [
      { text: '前端自学笔记系列', items: [
        { text: '前端自学笔记-第一篇(0805)', link: '/learning/前端自学笔记1'},
        { text: '前端自学笔记-第二篇(0811)', link: '/learning/前端自学笔记2'},
        { text: '前端自学笔记-第三篇(0818)', link: '/learning/前端自学笔记3'},
        { text: '前端自学笔记-第三篇(0825)', link: '/learning/前端自学笔记4'}
      ]
    },
      // { text: '前端面试之道',link: '/interview/'},
      { text: '数据结构和算法', link: '/algorithm/'},
      { text: 'Vue.js', link: '/vue/'},
      { text: 'Webpack',link: '/webpack/'},
      { text: 'VuePress',link: '/vuepress/'},
      { text: '基础配置功能',link: '/common/'}
  ]},
  configureWebpack: {
    resolve: {
      // 静态资源的别名
      alias: {
        '@vuepress': '../images/vuepress',
        '@vue': '../images/vue',
        '@learning': '../images/learning'

      }
    }
  }
}