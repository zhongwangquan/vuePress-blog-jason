## nginx配置

**目录**
[[toc]]

### 一、部署的nginx项目

### nginx项目列表
1. vuepress项目：<http://blog.flutterweb.cn>
2. mobx项目： <http://mobx.flutterweb.cn>

### nginx 配置二级域名

nginx是上按照从头到尾的顺序依次加载。

如果想配出像 blog.flutterweb.cn 前端静态资源二级域名。需要先配置出一个端口。然后在下面配置反向代理。

### nginx.conf配置demo
注意顺序：
静态资源先启动一个服务，比如9600端口，后面的虚拟主机再去代理9600端口即可。
这个demo是为了方便展示，也可以把端口文件写在conf.d文件夹中，一样的效果。


```js {2, 3, 4}

user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access-flutterweb.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;
     server {
        listen 9600;
        server_name yapi.flutterweb.cn;
        location / {
            root /usr/share/nginx/html/mobx;
            index  index.html index.htm;
        }
    }
    include /etc/nginx/conf.d/ *.conf;
    server {
        listen       80;
        server_name mobx.flutterweb.cn;

        client_header_buffer_size 8k;
        client_max_body_size 40m;
        send_timeout 120;
        fastcgi_read_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_connect_timeout 300;
        fastcgi_intercept_errors on;
        root html;
        location ^~ / {
            proxy_set_header X-Real-IP       $remote_addr;
            proxy_set_header Host $http_host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_pass http://www.flutterweb.cn:9600/;
        }
    }
}

```

配置完后可以通过<http://mobx.flutterweb.cn>来查看想过

**配置完说一个坑：**
每次修改完配置后我都是nginx -s reload 重启，但经常失效
**还是两步更保险点**

  nginx -s quit
  nginx

## 二、Flutter学习

跟着jpang学习，完成了小demo；
附上地址：<https://jspang.com/posts/2019/01/20/flutter-base.html#%E7%AC%AC01%E8%8A%82%EF%BC%9A%E8%AE%A4%E8%AF%86%E4%B8%80%E4%B8%8Bflutter>

可以说flutter最大的坑就在于安装，当然如果有很快的梯子当我没说。没有的话可能要装上个大半天。我window上装flutter快花了一天的时间，卡主一个点就没法进入下一步。

这里贴上安装最大的gradle包下载坑，其他flutter详细教程及视频见jpang

```js

一、额外安装步骤（也可以不单独下载包，20-30分钟下载时间，比较慢）
另一个文件需要下载好压缩包到本地然后应用路径修改为自己的路径
路径：C:\Users\zhong\.gradle\wrapper\dists
比如：gradle-4.10.2-all
则把gradle-4.10.2-all.zip文件直接放在gradle-4.10.2-all目录下，不需要解压，flutter会自动帮助解压。
版本最好不低于4.6

distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.2-all.zip
二、不需要改 文件源
build.gradle
不修改Flutter SDK包下的flutter.gradle文件, 路径D:\flutter\flutter\packages\flutter_tools\gradle

原因：1. 加的国内镜像，如果服务器改动将不能正常编译 2. 我安装了一下午就是更改了这两个文件，采用默认的反而能编译成功

```


## 三、后台管理系统

### 现在有两个比较好的后台系统教程
1. Vue + Element UI 实现权限管理系统 前端篇：<https://www.cnblogs.com/xifengxiaoma/p/9533018.html>

2. 手摸手，带你用vue后台：
<https://juejin.im/post/59097cd7a22b9d0065fb61d2>

推荐学习的顺序：
先1后2， 第一个教程更详细，更容易明白，对于对后台不太熟悉的小伙伴作为入门特别合适。等教程一啃的差不多了，可以进入教程二了，这个教程难度更大点，但收获会更大。

### 自己学习进度
vuex ,路由, elment ui动态换肤, 语言国际化
后面还剩一点东西，等有时间再整完