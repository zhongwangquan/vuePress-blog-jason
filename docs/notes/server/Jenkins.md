## jenkins部署


### 一、jenkins自动部署vuePress博客项目

### 自动化部署项目demo链接
<http://blog.flutterweb.cn>


### jenkins自动部署的好处

本地代码推动到git仓库后，jenkins能完成后续部署事项，减轻工作量，比如，项目自动打包，自动项目部署到静态服务器，部署情况邮件通知。

**tip:**

今天部署好了vuepress项目，现在写好了博客页面，只要vscode一提交，jenkins会自动打包并且部署；如果部署失败，还会发送邮件提醒。爽的不行！

![不使用别名引用](../../images/notes/3.png)

### 教程推荐
1. Jenkins打造强大的前端自动化工作流: 

<https://juejin.im/post/5ad1980e6fb9a028c42ea1be>

2. jenkins配置邮件通知(上篇教程虽然有，建议用这个):

 <https://www.cnblogs.com/imyalost/p/8781759.html>

### 部署过程中的坑
1.  vuepress 配置要注意，对于脚本的理解很重要，不然坑很大。

    vuepress的dist目录比一般的项目要多两级，因而配置稍稍不一样。
    贴图感受下：
    ![不使用别名引用](../../images/notes/2.png)


    ![不使用别名引用](../../images/notes/1.png)
::: tip
send build artificial over SSH， 参数说明：

Name:选择一个你配好的ssh服务器

Source files ：写你要传输的文件路径
1. 特别注意，起始目录是根目录 '/'
2. 如果mobx项目下面，打包后目录是build，则

    a. source files: build/build.tar.gz

    b. Remove prefix: build/
3. 如果mobx项目下面，打包后目录是build/docs/dist，则

    a. source files: build/docs/dist/build.tar.gz

    b. Remove prefix: build/docs/dist/
:::
2. 另外，购买服务器时，大家还是买阿里云吧，最好配置高点。
    我买的是腾讯云服务器，价格便宜。但今天为了自动化部署项目，jenkins挂了三四十次了，真是惨不忍睹。。。


## 二、后台管理系统学习进度

### 两周左右学完了简单的后台项目

**项目地址：**

Vue + Element UI 实现权限管理系统 前端篇：<https://www.cnblogs.com/xifengxiaoma/p/9533018.html> 

**收获**：

1. 了解了登陆流程，语言国际化，自定义皮肤
2. 动态加载菜单、权限管理是重点也是难点
3. mock使用了自己服务器搭建的yapi ,还算是稳定
4. 刚好最近公司在上一个后台项目，自己也有参与。这套教程不但帮助自己快速入手项目，而且偶尔能帮同事答疑。
5. 对于element ui各个模块用法及参数理解更透彻，过程中不断才坑，不断积累经验



