# 事件冒泡及事件委托
### 一、事件冒泡

要了解事件冒泡，先理解下事件处理的三个周期。

**DOM处理周期：三个阶段都存在**

第一阶段：事件捕获；这步在后台完成，用户无法操作。例如当点击元素div时，实际上点击顺序是：document-html-body-div
第二阶段：目标触发；
第三阶段：事件冒泡；这是用户可以操作的，默认是冒泡。当触发目标后，事件的传递方式。例如当点击元素div时，实际上点击顺序是：div-body-html-document
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20190129153517877.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)



下图是事件冒泡的示意图，还是挺形象的
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190129153528501.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_1,color_FFFFFF,t_70)
**事件冒泡的实例代码：**
```javascript
html代码：

<div id="box">
    <button id="btn">按钮</button>
</div>

js代码：

var btn = document.getElementById('btn');
var box = document.getElementById('box');
var body = document.body;

box.addEventListener('click', function(event) {
    console.log('div click');
});
body.addEventListener('click', function() {
    console.log('body click');
});
btn.addEventListener('click', function(event) {
     //冒泡机制,点击时，依次触发btn，box，body，html，document
    console.log('btn click');        
    //如果阻止冒泡，那么就不会触发box，body，html，document      
    // event.stopPropagation();       
        
});
```

阻止事件冒泡方法：

    DOM :  event.stopPropagation()
    ie :  event.cancelBubble=true；


### 二、事件委托

事件委托:将事件处理函数通过冒泡托管给父级元素

应用场景 --- 为未来元素(脚本动态创建的元素)绑定事件
	
**1. 当点击btn按钮时，会输出 '点击了'**

```javascript
html代码：
<div id="box">
    <button id="btn">按钮</button>
</div>


js代码：
window.onload = function() {
var box = document.getElementById('box');
var btn = document.getElementById('btn');
box.addEventListener('click', function(e) {
     //相当于其中e，也可以写成ev，event  var e=event? event||window.event;
    var e = e || event;     
     /*此时e是 MouseEvent事件，
	     type：click；
	     target: button#btn （target指的是click的元素节点button，此元素有id,nodeName,nodeValue,）
     */
     console.log(e);   
     //false。 此时this指的是box元素，而e.target指的是被点击的button元素    
     console.log(this === e.target); 
     //阻止事件继续向box以上层次冒泡，这样body,html,document就不会接收到click事件了
    e.stopPropagation();    
    //当点击btn时，事件传递到了box，触发了box的click事件-'点击了'          
    console.log('点击了');            
    });
}

```

**2. 给未来元素添加事件**

```javascript	
html代码：

<div id="box">
    <button>按钮</button><br />
    <div id="hao">nihao</div> -->  //点击div 元素时，此时event事件target就是div#hao
</div>

js代码：

var box = document.getElementById('box');
box.addEventListener('click', function(e) {
    var e = e || event;
    // console.log(e);
    e.stopPropagation();
    if (e.target.nodeName == "BUTTON") {  //当点击的元素nodeName为BUTTON时
        //给未来元素(脚本动态创建的元素)绑定事件
        var button = document.createElement('button');  //创建button元素
        button.innerHTML = 'new button'; 
        box.appendChild(button);              //追加子节点button
});
```

**3. 给子元素添加不同的处理函数**

```javascript	
html代码：
<div id="box">
    <button id="btn1">第1个按钮</button>
    <button id="btn2">第2个按钮</button>
    <button id="btn3">第3个按钮</button>
    <button id="btn4">第4个按钮</button>
    <button id="btn5">第5个按钮</button>
</div>

js代码：
var box = document.getElementById('box');
box.addEventListener('click', function(e) {
    var e = e || event;
    e.stopPropagation();     //阻止事件冒泡
    switch (e.target.id) {  //判断被点击的元素id
        case 'btn1':       //不同的id有不同的处理函数
            console.log(11111);
            break;
        case 'btn2':
            console.log(222222);
            break;
        case 'btn3':
            console.log(33333333333);
            break;
        case 'btn4':
            console.log(44444444444);
            break;
        case 'btn5':
            console.log(5555555555);
            break;
        }
});
```	
