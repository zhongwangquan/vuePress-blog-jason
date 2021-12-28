
# this指向及改变this指向

js中this指向是一个难点，花了很长时间来整理和学习相关的知识点。

## 一、 this
this是JS中的关键字， 它始终指向了一个对象， this是一个指针;

## 二、 this显示绑定和隐式绑定

#### 1. this显示绑定
&emsp;含义： 当一个函数没有明确的调用对象的时候， 也就是单纯作为独立函数调用的时候， 将对函数的this使用默认绑定： 绑定到全局的window对象

&emsp;在显式绑定下： 函数将取得在“ 包含对象“ 里的永久居住权， 一直都会” 住在这里“
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123724794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)

&emsp;**1.1 全局函数**

```javascript
function fire() {
    console.log(this === window); //fire此时是全局的方法，this指向window
}
fire(); // 输出true
```

&emsp;**1.2 函数内嵌套函数**

```javascript
function fire() {
    // 我是被定义在函数内部的函数哦！
    function innerFire() {
        console.log(this === window); //未明确调用对象，this指向window
    }
    innerFire(); // 独立函数调用
}
fire(); // 输出true
innerFire();
```

示例：
```javascript
var a = 1;
console.log(this.a); //1 因为此时this指向了window，因而调用1
function fire() {
    var a = 2;
    console.log(this.a); //1 因为此时this指向了window，因而调用1

    function innerFire() {
        var a = 3;
        console.log(this.a); //1 因为此时this指向了window，因而调用1
    }
    innerFire();
}
fire(); //输出1
```

&emsp;与作用域的区别： 全局作用域和局部作用域， 去掉this可发现区别
```javascript
var a = 1;
console.log(a); //1 a在全局作用域
function fire() {
    var a = 2;
    console.log(a); // 2 fire函数作用域
    function innerFire() {
        var a = 3;
        console.log(a); //3 此时打印输出a，a在innerFIre作用域。从自身作用域查找变量，未找到才网上查找
    }
    innerFire();
}
fire();
```
&emsp;**1.3 对象内层函数内部函数**

```javascript
var obj = {
    fire: function () { //此时的fire函数其实用到了隐式绑定
        function innerFire() {
            console.log(this === window); //未明确调用对象，this指向window
        }
        innerFire();
    }
}
obj.fire(); //输出 true
```

**示例：**
```javascript
var a = 1;
console.log(this.a); //1 this指向全局变量window
var obj = {
    a: 2,
    fire: function () {
        var a = 3;
        console.log(this.a); //2 因为是obj.fire()，调用了fire函数，因为this指向了obj，输出了obj下的a=2
        function innerFire() {
            var a = 4;
            console.log(this.a); //1 未明确调用对象，this指向window
        }
        innerFire(); //没有明确调用的对象
        console.log(this.a); //2 this指向obj
    }
}
obj.fire();
```
#### 2、 this隐式绑定
&emsp;**a.隐式绑定**

&emsp;当函数被一个对象“ 包含” 的时候， 我们称函数的this被隐式绑定到这个对象里面， 这时候， 通过this可以直接访问所绑定的对象里面的其他属性， 比如下面的a属性

&emsp;在隐式绑定下： 函数和只是暂时住在“ 包含对象“ 的旅馆里面， 可能过几天就又到另一家旅馆住了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123734759.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)
```javascript
var obj = {
    a: 1,
    fire: function () { //此时函数的this被隐式绑定到了对象obj
        console.log(this == obj); // obj中有fire函数，因而默认this指向obj
        console.log(this.a); // 1 this.a 相当于obj.a =1
    }
}
obj.fire(); // 输出1 
```
**&emsp;相同的方法：**
&emsp;fire函数并不会因为它被定义在obj对象的内部和外部而有任何区别，

```javascript
function fire() {
    console.log(this.a)
}

var obj = {
    a: 1,
    fire: fire
}
obj.fire(); // 输出1
```

&emsp;**b.动态绑定：**
&emsp;this实在代码运行期绑定而不是在书写期

```javascript
var obj = {
    a: 1, // a是定义在对象obj中的属性 1
    fire: function () {
        console.log(this.a)
    }
}
var a = 2; // a是定义在全局环境中的变量 2
obj.fire(); //1  此时fire的指向时obj
var fireInGrobal = obj.fire; //因为fireInGrobal是全局变量，this对于obj的绑定丢失，绑定到了全局window
fireInGrobal(); // 输出 2 输出全局变量啊
```

```javascript
var a = 2;
var obj = {
    a: 1, // a是定义在对象obj中的属性
    fire: function () {
        console.log(this.a)
    }
}

function otherFire(fn) { //全局函数，this绑定window
    fn();
}
otherFire(obj.fire); // 输出2   this对于obj的绑定丢失，绑定到了全局this上面
```


```javascript
var obj = {
    a: 1,
    obj2: {
        a: 2,
        obj3: {
            a: 3,
            getA: function () { //obj3.getA()   this绑定到了obj3当中
                console.log(this.a)
            }
        }
    }
}
obj.obj2.obj3.getA(); // 输出3
```





## 三、 this指向
&emsp;this的指向不是由定义this决定的， 而是随脚本解析自动赋值的。


**1. 全局环境作用域:** this在全局环境始终指向window

&emsp;
&emsp;变量形式

```javascript
console.log(this === window) // true
console.log(window.alert === this.alert) // true
console.log(this.parseInt("021", 10)) // 21
var fruit = "banana"; // 定义一个全局变量，等同于window.fruit = "banana"
```



**2. 函数环境 作用域：** 函数由谁调用， this就指向谁

&emsp;**2.1 非严格模式**



```javascript
function fn() {
    console.log(this); //window
}
fn() === window; // true；window.fn（),此处默认省略window
```

&emsp;**2.2 严格模式**

&emsp;&emsp;a 全局环境下， this指向window
```javascript
"use strict";
this.b = "MDN";
console.log(this == window) // "MDN"
console.log(b) // "MDN"
```

&emsp;&emsp;b 函数环境下， this为undefined

```javascript
function fn() {
    "use strict"; // 这里是严格模式
    console.log(this); //window
}
fn() === undefined //true
```

**3 对象中的方法函数调用:** 指向 该方法所属的对象
&emsp;隐式调用

```javascript
var obj = {
    a: 1,
    fn: function () {
        return this;
    }
}
console.log(obj.fn() == obj); //true  函数被obj调用，指向obj
```

&emsp;this动态绑定

```javascript
var obj = {
    a: 1,
    fn: function () {
        return this;
    }
}
console.log(obj.fn()); //1  函数被obj调用，指向obj，输出obj的a=1
var a = 2;
var newfun = obj.fn; //此时更改this指向为全局变量newfun
newfun(); //2 ，this访问全局变量a=2
```


**4 在构造函数中:** this始终指向新对象
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123753719.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)
```javascript
function Person(age, name) {
    this.age = age;
    this.name = name
    console.log(this) // 此处 this 分别指向 Person 的实例对象 p1 p2
}
var p1 = new Person(18, 'zs')
var p2 = new Person(18, 'ww')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123455799.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)
**5 通过事件绑定的方法:** this 指向 绑定事件的对象

```javascript
oBtn.onclick = function () {
        console.log(this); // btn
    }

    <
    button id = "btn" > hh < /button>
```


**6 定时器函数:** 因为是异步操作， this 指向 window

&emsp;延时函数内部的回调函数的this指向全局对象window（ 当然我们可以通过bind方法改变其内部函数的this指向）

&emsp;我们常见的window属性和方法有alter， document， parseInt， setTimeout， setInterval， location等等， 这些在默认的情况下是省略了window前缀的。（ window.alter = alter）。

&emsp;**6.1 普通定时器**
```javascript
setInterval(function () {
    console.log(this); // window
}, 1000);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123505846.png)
&emsp;**6.2 定时器嵌套**

```javascript
function Person() {
    this.age = 0;
    setTimeout(function () {
        console.log(this);
    }, 3000);
}

var p = new Person(); //3秒后返回 window 对象
```

&emsp;**6.3 可以改变this指向 - 想见三方法**

```javascript
function Person() {
    this.age = 0;
    setTimeout((function () {
        console.log(this);
    }).bind(this), 3000);
}
var p = new Person(); //3秒后返回构造函数新生成的对象 Person{...}
```

**7 自执行函数(匿名函数):** 指向全局变量window

```javascript
(function inner() {
    console.log(this); //this ==> window
})();
```

**8 箭头函数**

要点：

    a. 箭头函数的this是在定义函数时绑定的， 不是在执行过程中绑定的
    b. 箭头函数中的this始终指向父级对象
    c. 所有 call() / apply() / bind() 方法对于箭头函数来说只是传入参数， 对它的 this 毫无影响。

```javascript
var obj = {
    a: 1,
    fn: () => {
        //箭头函数中的this始终指向定义时的环境
        //箭头函数中的this始终指向父级对象
        console.log(this); //对象内的this调用时一般指向obj，而箭头函数在创建时就指向了obj的父级对象window
    }
}
obj.fn(); //window
```


## 四、 更改this指向

&emsp;每个Function构造函数的原型prototype， 都有方法
call(), apply(), bind()

    总结：
    a call(), apply()
    在特定作用域调用函数
    b bind（）
    会创建一个函数的实例， this会被绑定到bind() 函数
    bing() 绑定this， bind()() 调用函数


**1. call() 方法**

```javascript
var Person = {
    name: "zhangsan",
    age: 19
}

function aa(x, y) {
    console.log(x + "," + y);
    console.log(this);
    console.log(this.name);

}

aa(4, 5); //this指向window--4,5  window  空

aa.call(Person, 4, 5); //this指向Person--4,5  Person{}对象  zhangsan
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123601444.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)
**2. apply() 方法**

&emsp;apply() 与call（） 非常相似， 不同之处在于提供参数的方式， apply（） 使用参数数组， 而不是参数列表

```javascript
var Person = {
    name: "zhangsan",
    age: 19
}

function aa(x, y) {
    console.log(x + "," + y);
    console.log(this);
    console.log(this.name);

}

aa.apply(Person, [4, 5]); //this指向Person--4,5  Person{}对象  zhangsan
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123614687.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)

**3. bind() 方法**
&emsp;bind() 创建的是一个新的函数（ 称为绑定函数）， 与被调用函数有相同的函数体， 当目标函数被调用时this的值绑定到 bind() 的第一个参数上
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123534949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)
```javascript
var Person = {
    name: "zhangsan",
    age: 19
}

function aa(x, y) {
    console.log(x + "," + y);
    console.log(this);
    console.log(this.name);

}

aa.bind(Person, 4, 5); //只是更改了this指向，没有输出
aa.bind(Person, 4, 5)(); //this指向Person--4,5  Person{}对象  zhangsan
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123625863.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)
**4. 存储this指向到变量中**

```javascript
var oDiv1 = document.getElementById("div1");
oDiv1.onclick = function () {
    var _this = this; //将this储存在变量中，而且不改变定时器的指向
    setTimeout(function () {
        console.log(_this); //注意这里是_this，而不是this-- <div id="div1">点击</div>
        console.log(this); //定时器的指向没有被改变--仍然是window
    }, 1000)
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123634189.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123638567.png)



## 五、 改变this指向综合案例**

**1、 为更改this指向**

```javascript
var oDiv1 = document.getElementById("div1");
oDiv1.onclick = function () {
        setTimeout(function () {
            console.log(this); //点击时输出 window对象
        }, 1000)
    }

    <
    div id = "div1" > 点击 < /div>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123648340.png)
**2、 更改this指向 - bing， call， apply**
&emsp;在定时器外， 在绑定事件中的this肯定指向绑定事件的对象div啊， 用call和apply都行

```javascript
var oDiv1 = document.getElementById("div1");
oDiv1.onclick = function () {
    setTimeout(function () {
        console.log(this); // 更改this指向为 <div id="div1">点击</div>
    }.bind(this), 1000)
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123653731.png)
**3、 存储this指向到变量中**

```javascript
var oDiv1 = document.getElementById("div1");
oDiv1.onclick = function () {
    var _this = this; //将this储存在变量中，而且不改变定时器的指向
    setTimeout(function () {
        console.log(_this); //注意这里是_this，而不是this-- <div id="div1">点击</div>
        console.log(this); //定时器的指向没有被改变--仍然是window
    }, 1000)
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190111123700710.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019011112370737.png)

参考资料：
1. [JavaScript函数中的this四种绑定形式](https://www.jb51.net/article/121164.htm)
2. [this指向及改变this指向的方法](https://blog.csdn.net/xuehangongzi/article/details/80841167)