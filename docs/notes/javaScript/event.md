# Event事件处理

### 1. HTML事件
&emsp;直接添加到HTML结构中

```javascript
function show() {
    alert('hello');
}

<body>
    <button id="btn" onclick="show()">按钮</button>
</body>
```

### 2. DOM0级事件
&emsp;把一个函数赋值给一个事件处理程序
 &emsp;  &emsp; a. 移除事件：event.onclick = null
 &emsp; &emsp;  b. dom 0级事件只允许绑定一个事件处理函数

```javascript
<button id="btn">按钮</button>

var btn = document.getElementById('btn');
btn.onclick = function() {
    alert('hello');
}

btn.onclick = function() {
    alert('ok');           //覆盖上面的函数，只会显示"ok"
}
```

### 3. DOM2级事件
&emsp;dom2级事件允许给元素绑定多个事件处理函数

**a. 添加事件**
addEventListener("事件名"，事件处理函数，"布尔值")；
&emsp;true：事件捕获
&emsp;false：事件冒泡

**b. 移除事件**
     removeEventListener("事件名"，事件处理函数)
 

案例1：DOM2级事件  
```javascript
    btn.addEventListener('click', function() {
        alert('show');
        // arguments.callee 指向当前函数
        btn.removeEventListener('click', arguments.callee); 
    });
 ```   

-----------
案例2：  给同一个事件绑定多个处理函数
```javascript
<button id="btn">按钮</button>

var btn = document.getElementById('btn');
//function()是匿名函数形式
btn.addEventListener('click', function() {  
    alert('ok');
});
function show() {                      
    alert('show');
}
//结果"ok","show"--两个事件都会处理，show引用函数名
btn.addEventListener('click', show); 
```
案例3：一次性事件
```javascript
<button id="btn">按钮</button>
<script>
    var btn = document.querySelector('#btn');
    function show() {
        alert('show');
        //当执行一次事件后，移除事件
        btn.removeEventListener('click', show); 
    }
    btn.addEventListener("click",show);
</script>
```


一次性事件用this和callee方法
```javascript
<button id="btn">按钮</button>
<script>
    var btn = document.querySelector('#btn');
    btn.addEventListener("click",
        function() {
            alert('show');
            //当执行一次事件后，移除事件
            this.removeEventListener('click', arguments.callee); 
        }
    );
</script>
```

### 4. IE事件处理程序（ie8及以下版本）


a. attachEvent("事件名"，事件处理函数) 
   

b. detachEvent("事件名"，事件处理函数)




**事件处理函数兼容处理写法**
```javascript   
function addEvent(elm, type, callback) {
    if (elm.addEventListener) {
        elm.addEventListener(type, callback); //DOM事件
    } else if (elm.attachEvent) {
        elm.attachEvent('on' + type, callback);//ie事件，事件需要带on
    } else {
        elm[on + "type"] = callback;     //HTML事件
    }
}
window.onload = function() {
    var btn = document.getElementById('btn');
    addEvent(btn, 'click', function() {       
        alert(123);
    });
}

html代码：
<body>
    <button id="btn">按钮</button>
</body>
```