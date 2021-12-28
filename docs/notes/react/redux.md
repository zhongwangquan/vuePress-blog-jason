# Redux简易理解
### 1. createStore（相当于vuex的$store)
	
这才是数据存储仓库，用来存储初和输出的数据，更vuex$store功能一样
**作用：**
&emsp;创建一个 Redux store 来以存放应用中所有的 state。
&emsp;应用中应有且仅有一个 store。
   
**a.store构成**  
```javascript
	 //发送action
	store.dispatch(actions)
	
	//获取数据
	store.getState()
	 //订阅，更新数据到视图
	store.subscribe(()=>{{})
	
	console.log(store)
```



**b. store例子**
```javascript
createStore  import {createStore} from 'redux'
import reducer from './reducer' //第三步 的reducers

const store = createStore(reducer)
```



**c. sate初始化数据**
初始化数据state数据，一般设置为null，[],{}等，为reducer完成初始化工作。
```javascript
const state = {
    todos: [
    {
        id: 1,
        title: "周四了"
    },{
        id: 2,
        title: "马上周五了"
    }
    ]
}
 ```
### 2. reducers (相当于vuex- mutations)
通过reuducer来操作数据
```javascript
import state from './state'
import * as type from './type'


const reducer = (previousState = state ,action) => {
//new_state是state解构后的值，state值的初始化时不再会影响new_state。
//previousState 初始化数据state,将初始化的值存放在new_state中，不直接修改state中的值

    let new_state = {
        ...previousState
    }
 //通过判断不同的reducers名，而vuex则更加简单
    switch (action.type) {
    case type.ADD_TODO_ITEM:
        //这里修改的是新数据
        new_state.todos.push({
            id: getBiggerId(new_state.todos) + 1, //最大的id+1
            title: action.payload
        })
        break;
    
    default:
        break;
    }
    //返回new_state必不可少
    return new_state
}
 
 //动态的获取state数组最大的id值
function getBiggerId(arr){
    let new_arr = arr.slice()
    if( !arr.length ) return 0
 
    new_arr = new_arr.sort((a,b)=>{
    return b.id - a.id //倒叙排，大的在前，小的在后
    })
    return new_arr[0].id
}
```
    
 

### 3. action Creators （相当于vuex-actions）

  定义方法，发送action 到reducer
   ```javascript
    import * as type from './type'
    import store from './index'
    
    const actionCreators = {
        //定义的方法
        addTodoItem(payload){
        //1. 创建一个动作
        let action = {
            type: type.ADD_TODO_ITEM,
            payload
        }
        //2. 发送动作给 reducer
        //1. Store，dispatch相当于vuex的this.$store 及commit
        store.dispatch(action)    
        }
    }
    
    //暴露action
    export default actionCreators
```
	


### 4. 视图层


**1. 触发action方法**
```javascript
import React, {Component} from 'react'
import actionCreators from './../store/actionCreators';
class TodoInput extends Component{
    let value = this.input.value 
    if( e.keyCode === 13 ){
        //触发action中的addTodoItem方法
        //通过直接引入actionCreators，（vuex是通过this.$store.dispatch(addTodoItem）)
        actionCreators.addTodoItem(value)  
        this.input.value = ""
    }
    }
}
```
**2. 获取store数据和更新视图**

添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state。
```javascript
import React, {Component} from 'react'
//此时是手动引入定义好的状况，不能全局共享
import store from '../store'
 
class TodoContent extends Component{
 
    componentWillMount(){
    //更新数据到视图
    store.subscribe(()=>{ 
        this.setState({
        //获取store中的数据
        todos: store.getState().todos
        })
    })
    }
```	
	







