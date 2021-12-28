## 学习记录

<!-- **目录**
[[toc]] -->

### 一、完整链路的思想


### 作者文章链接
**我在淘宝做前端的这三年 — 第二年**： <https://juejin.im/post/5c7dafe8f265da2de25bab27>

ps: 作者的文章有三篇，涉及第一至第三年。我是看了快半个多小时，收益匪浅。建议大家花上一点时间好好看看

### 最大收获-完整链路思想

无论是职业发展，事业选择，还是生活的小事，是否值当的评判标准可以加上一条：**完整链路**。

    比如：这个项目赚钱，然后不断迭代，赚更多的钱，再迭代。。。循环下去。这就是个好的链路，是一个完整的闭环。

    而坏的链路是：产品原型就行不通，硬把项目开发完，很显然项目不赚钱，迭代后还是不赚钱，慢慢就不了了之了，还落得一地鸡毛。

### 预判未来多了一个标准

你可能会想，这个有什么，不就是鸡汤嘛。

其实不然，他的作用更大**体现在事情发生之前，体现在未雨绸缪**。当我们做决策的时候，是需要综合各方信息，并结合未来的走势综合去判断。



有了完整联络的思想，可以把未来窜起来。如果这个链路是通的，说明这个方案（或者想法。。）的可行性比较高。如果初期链路预想都不通，那是否去做去执行，就要打上大大的问号。


### 完整链路-个人应用的栗子

我最近也用在自己身上

1. 早睡早起就是个好习惯。之前我都是12点睡，8点起。现在改为11点睡，7点起。早上反而有2个左右时间学习或者做其他事情的时间。
这个早睡早起的习惯，就比之前更可持续。

2. 再比如，前端各种技术，先学那个，后学哪个。有了完整链路思想，就简单了。当然是目前最重要，而且对于后期的发展更有利的技术。（目前就是下面提到的动效createJs技术）。就不会乱学一通，跟无头苍蝇一样。

3. 再举个栗子吧：自己做饭也是个很好的链路。饭做得好吃，就不喜欢去外面吃了。之后手艺变的更好，吃的花样也就越来越多，可持续的很。
（ps: 做了几个礼拜的饭，确实觉得外面的饭菜越来越难吃了）


## 二、canvas动效框架createJs

### 使用教程链接
CreateJS入门 -- 注释详细到爆炸（My Style）:<https://juejin.im/post/5b4eff0de51d4517580ddfa9>

官网API: <http://www.createjs.cc/src/docs/easeljs/classes/Bitmap.html#property_mask>

### 心得

公司偏动效开发，而热门产品的动效使用的正是createJs技术。自己也很快要开发类似产品，相关的技术也要学起来，作为储备。

通过两三个早上的学习，createJs学起来还是比canvas简单，毕竟他跟vue框架一样是封装好的，调取api即可。

本次学习createJS不同以往，之前主要是跟着别人的思路走：要么是纯教程或者视频。而跟着别人走，虽然看似节省时间，但对于技术的整体脉络会比较片面，只是掌握了教材中教的技术而已。

这次主要是看官方的文档，再去整理笔记，不断消化主要的api。这种学习方式比上面的效率反而更高，学习方式也是可持续的。

当然这种学习方法也是有前提的，最好是官网文档比较齐全，入门教容易的，太难的还是其他的方法吧。



## 三、vue+js: 预览图随着滚动条平滑移动

### 技术要点

1. 产品需求很简单，只是预览图能够拖动就行。想着顺便做一个随着滚动条移动的效果，这样体验会更好。

2. **技术难点：**

+ 在mounted中获取全局以及局部滚动条的高度
* 因为是在vue项目中操作dom，且不使用jQuery的情况下。要让滚动条平滑移动，这里采用的是网上分段的方法，然后递归去递增或者递减。
+ 涉及到向上和向下滚动，滚动的临界点，如果快速上下滚动，会发生抖动。我是加了锁，而且把临界点隔开几像素来避免。
- 为了让滚动条始终保持在底部，可以采用：scrollTop=scrollHeight-clientHeight

### 代码参考
```js
<template>
    <div class="content" ref='mobileRef'> // 固定高度
        <div class='content-scroll' ></div>
    </div>
</template>

<script>
    data () {
        return {
            once: true
        }
    },
    mounted() {
        // 监听页面内div元素滚动条
        // this.$refs.mobileRef.addEventListener('scroll', ()=>{
        //         console.log('scrollHeight', this.$refs.mobileRef.scrollHeight)
        //         if(this.form.backgroundImg) {
        //             this.$refs.mobileRef.scrollTop = this.$refs.mobileRef.scrollHeight 
        //         }
        //         console.log(" scroll " + this.$refs.mobileRef.scrollTop)
        // }, false)
        this.$nextTick(function () {
            window.addEventListener('scroll', this.onScroll) // 监听滚动条
        })
    },
    methods: {
        onScroll () {
            let that = this
            let scrolled = document.documentElement.scrollTop || document.body.scrollTop // 获取滚动条srcollTop
            let step = ''
            if(this.form.backgroundImg) {
                let divHeight =  that.$refs.mobileRef.scrollHeight // 左侧元素的滚动条高度
                let divClient = that.$refs.mobileRef.clientHeight // 滚动条本身的高度
                step =  divHeight/50  // 平滑滚动，设置了50，后面设置定时器，每10秒变化一次
                if(scrolled <705 && this.once == false ) {  // once锁一定要是全局的，不能设置在方法onScroll中
                    smoothUp()
                } else if(scrolled >710 &&  this.once == true) { // 为了形成互斥效果，两边都需要判断scrolled的高度，以及互斥锁
                    smoothDown()
                }
         
                function smoothDown() {

                    if(that.$refs.mobileRef.scrollTop <divHeight-divClient) { // divHeight-divClient 就是srcollTOP的最大高度
                        that.$refs.mobileRef.scrollTop += step
                        // 递归，会一直调用，直到return false .递归的出口是：that.$refs.mobileRef.scrollTop =divHeight-divClient
                        setTimeout(smoothDown, 10)                         
                    } else {
                        setTimeout(()=>{  // 锁设置了定时器，主要是为了防止scrolled 在710的节点出现快速上下滑动出现的抖动行为
                            that.once = false
                        }, 200 )
                    }
                }
                function smoothUp() {
                    if(that.$refs.mobileRef.scrollTop > 0) {
                        that.$refs.mobileRef.scrollTop -= step
                        setTimeout(smoothUp, 10) // 递归的出口是：that.$refs.mobileRef.scrollTop = 0
                    } else {
                        setTimeout(()=>{
                            that.once = true
                        }, 200 )
                    }
                }
            } 
        }
    }

</script>

```



