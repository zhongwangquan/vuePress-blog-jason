# cookie 存取删除，生存期
## 一、了解cookie
cookie是一种会话跟踪技术

**会话：** 
&emsp;用户进入网站，从开始浏览信息到关闭浏览器的过程被称为一次回话。

**会话跟踪技术:**
&emsp;浏览器(客户端)和服务器之间在进行多次请求数据时，数据共享的过程就成为会话跟踪技术。

## 二、cookie存/取

**存cookie**

	document.cookie = "键=值";

**取cookie**

    document.cookie;


下面是存取cookie的示例：

### 1. 单条数据逐个存取

```javascript
js代码：

var set = document.getElementById('set');
var get = document.getElementById('get');
var username = document.getElementById('username');
set.onclick = function() {
	document.cookie = "username=" + username.value; //存cookie ，是字符串形式   
}

get.onclick = function() {
	console.log(document.cookie);     //取cookie
}

html代码：

<a href="eg02.html">eg02</a>
<input type="text" id="username">
<button id="set">存cookie</button>
<button id="get">取cookie</button>
```
### 2. 多条数据存为json字符串

```javascript

//先设置一个json对象
var info = {
    "userphone": res.userphone,  //res.userphone是字符串
    "userpassword":res.userpassword
}

//将json对象转换成json字符串，存储到cooki中
addCookie("ab",JSON.stringify(info));

//增加cookie封装的函数
function addCookie(key, val, day) { //key是String类型
    if (day) {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + "=" + val + ";expires=" + date;
    } else {
        document.cookie = key + "=" + val;
    }
}

console.log(document.cookie);
```	
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190130143658516.png)
	

### 3. 读取cookie后，拆分cookie

	
```javascript

js代码：

//cookie需要登录服务器端，本地不能存取
var set = document.getElementById('set');
var get = document.getElementById('get');

set.onclick = function() {
	document.cookie = 'username = zhangsan';
	document.cookie = 'age=20';
	document.cookie = 'sex=nan';
	alert('存好了');
}

//读取多条cookie ,是一个字符串，以"; "分隔
console.log(document.cookie);
get.onclick = function() {
    //把字符串以；拆分为数组  
    var arr = document.cookie.split('; ');    
    for (var i = 0; i < arr.length; i++) {
        //把数组中字符串按照=拆分为数组
        var item = arr[i].split('=');     
        if (item[0] == 'username') { 
            //item[1]就是获取的值
            console.log('用户名:' + item[1]);  
        }
    }
}


html代码：

<button id="set">存 </button>
<button id="get">取 </button>
```

## 三、cookie生存期

cookie生存期，是cookie数据在浏览器上保存的时间。

生存期是cookie的一个参数。


设置cookie生存期的方式：

    document.cookie = "键=值;expires = 标准时间格式"


cookie生存期示例：

```javascript
js代码：

var set = document.getElementById('set');
var del = document.getElementById('del');
set.onclick = function() {
	//当前时间
	var d = new Date();
	//预期关闭cookie时间
	d.setDate(d.getDate() + 2);
	//需要是标准时间格式
	document.cookie = 'username=zhangsan;expires=' + d;
}

del.onclick = function() {
	//此时username="" 并且生存期为默认值。等到关闭浏览器时，cookie就被删除了
	document.cookie = 'username="";expires=-1';	
}

html代码：

<button id="set">存</button>
<button id="del">删</button>
```

## 四、删除cookie
删除cookie可以将键对应的值设置成字符串或将生存期设置成-1

    document.cookie = "键="";expires = -1"


示例：

//此时username="" 并且生存期为-1。等到关闭浏览器时，cookie就被删除了

	document.cookie = 'username="";expires=-1';
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190130143853131.png)