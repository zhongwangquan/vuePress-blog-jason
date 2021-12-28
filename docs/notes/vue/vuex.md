# 通俗理解vuex原理
本文主要通过简单的理解来解释下vuex的基本流程，而这也是vuex难点之一。

首先我们先了解下vuex的作用
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190309133114411.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_06,color_FFFFFF,t_70)
vuex其实是集中的数据管理仓库，相当于数据库mongoDB，MySQL等，任何组件都可以存取仓库中的数据。


### vuex流程与vue类比
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019030913312313.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_06,color_FFFFFF,t_70)
我们看一下一个简单的vue响应式的例子，vue中的data 、methods、computed，可以实现响应式。


视图通过点击事件，触发methods中的increment方法，可以更改state中count的值，一旦count值发生变化，computed中的函数能够把getCount更新到视图。



```javascript
    <div id="app">
        <button @click="increment"></button>
        {{getCount}}
    </app>
    
    
    new Vue({
        el: "#app",
        // state
        data () {
         return {
            count: 0
         }
        },
        
        // actions
        methods: {
         increment () {
            this.count++
         }
        },
        
         // view
        computed: {
            getCount(){
                return this.count
            }
            
        },
    })
```



**那vuex和这个vue响应式例子有什么关系呢？**

我们也可以用vuex来实现同样的功能，来实现vuex与vue的类比。


其实原理都是一样的，在vuex中有四个部分：state 、 mutations 、 actions  、getters


**类比：**


**可以先假设没有 actions的情况下：**

他们的对应关系是这样的：


**更改数据  mutations->methods  
获取数据  getters -> computed
数据&nbsp;  &nbsp; &nbsp; &nbsp;    state->data**  

视图通过点击事件，触发mutations中方法，可以更改state中的数据，一旦state数据发生更改，getters把数据反映到视图。

那么action 又是做什么的呢，可以理解是为了处理异步，而单纯多加的一层。要是没有设计上可以没有这一步。


**那可能很多人有疑问，dispatch，commit，又是做什么的呢？**

是时候拿出这张图了：

在vue例子中，我们触发的click事件，就能触发methods中的方法，这是vue设计好的。而在vuex中则不行了，一定要有个东西来触发才行，就相当于自定义事件on，emit。vuex中的action，mulation通过on自定义的方法，相应的需要emit来触发。

他们的关系是这样的： 通过dispatch可以触发actions中的方法，actions中的commit可以触发mulations中的方法。




![在这里插入图片描述](https://img-blog.csdnimg.cn/20190309143234808.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)


**我们来看看vuex的示例，来实现vue的同样功能**


```javascript
const store =  new Vuex.Store({
    
    state: {
        count: 0
    },
    
    //state的值只能通过mutations来修改
    mutations: {
        increment(state) {
        	state.count++
        }
    },
    
   //this.$store.commit("increment")触发mutations中函数"increment"
    actions: {
        increment({commit}) {
       		 commit("increment"); //this.$store.commit("increment")
        }
     
    },
    
   //通过getter中的方法来获取state值
    getters: {
        getCount(state) {
        	return state.count
        }
    }
    })
     
    export default store
    
   
```

App.vue
```javascript  

    
    <template>
    <div id="app">
            <button @click="increment">增加</button>
            {{this.$store.getters.getCount}}
    </div>
    </template>
     
    <script>
    export default {
        methods: {
        increment(){
	            //this.$store.dispatch("increment")触发actions函数"increment"
	            this.$store.dispatch("increment")
        	}
        }
    }
    </script>
```

上面例子中actions和mulations的函数名都是一样的，为了方便理解，我把名字取成不一样的，来帮助大家理解。

### 更改increment函数名-验证对应关系
通过dispatch-actions  ，commit-mutation  找到了他们之间的连接关系


 store.js
```javascript

        const store =  new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            incrementMutations(state) {
            	return state.count++
            }
        },
            
        actions: {
            incrementActions({commit}) {
            	commit("incrementMutations"); 
            }
         
        },
        
        //通过getter中的方法来获取state值
        getters: {
            getCount(state) {
            	return state.count
            }
        }
        })
         
        export default store
        
        
    main.js
        import Vue from 'vue'
        import App from './App.vue'
        import store from './store'
         
        Vue.config.productionTip = false
         
        new Vue({
        store,
        render: h => h(App)
        }).$mount('#app')
 ```

  App.vue 
      
 ```javascript 
        <template>
        <div id="app">
            <div id="app">
                <button @click="incrementClick">增加</button>
                {{this.$store.getters.getCount}}
            </div>
        </div>
        </template>
         
        <script>
        export default {
            methods: {
            incrementClick(){
                this.$store.dispatch("incrementActions")
            }
            }
        }
        </script>
```



	
参考资料：
本文的图片来源一篇英文文章：[Intro to Vuex](https://www.vuemastery.com/courses/mastering-vuex/intro-to-vuex/)，感兴趣的可以去看下。




















