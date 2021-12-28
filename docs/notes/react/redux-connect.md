
# redux中connect组件四种方案		
**方案一：state，和dispatch分开**
```javascript
let mapDispatchToProps = (dispatch) => {
return {
  aa(){
    let action = actionCreators.increment()
    dispatch(action)
  }
}
}
 
export default connect(state => state.count,mapDispatchToProps)(Button)
```


**方案二：state，和dispatch结合**
```javascript
export default connect(state => state.count,dispatch => {
return {
  aa(){
    let action = actionCreators.increment()
    dispatch(action)
  }
}
})(Button) 
```

**方案三：bindActionCreators**

state值得是store的仓库，通过connect已经把react组件与Redux store连接，
state.count 则表示，仓库的这个count模块数据。

```javascript
export default connect(state=> state.count, dispatch => {
	return bindActionCreators(actionCreators,dispatch)
})(Button) 
```

 
**方案四**
```javascript
let getCount = (stateType,actionType)=>{ connect(state =>state.stateType, dispatch=>{
    return bindActionCreators(actionType,dispatch)
  })
}
```

	引入到组件： export default getCount('count')(Button) //count表示仓库Store的count模块数据

**方案五：封装成函数，之后直接调用**

```javascript
const getHome = (UIComponent) => {
  return connect(
    state => state.home,
    dispatch => {
      return bindActionCreators(actionCreators,dispatch)
    }
  )(UIComponent)
}



```
	引入: export default getHome(Hot)    //hot值得就是UIComponent