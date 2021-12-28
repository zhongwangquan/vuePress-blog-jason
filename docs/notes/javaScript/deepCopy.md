# 对象拷贝的方法
&emsp;对象拷贝的方法是一个难点，尤其是深拷贝。建议把代码都运行下，帮助理解拷贝。

### 一. json方法

**1. 适合情况**： 
&emsp;JSON对象的深度克隆。方法是先JSON.stringify() 转为json字符串， 再JSON.parse() 转为json数组

**2. 缺点：**
 &emsp;   a. 如果你的对象里有函数, 函数无法被拷贝下来
  &emsp;  b. 无法拷贝copyObj对象原型链上的属性和方法



```javascript
var obj = {
    x: 1,
    y: {
        a: 1,
        b: 0,
        c: [1, 2, 3]
    }
};

// 相同的引用
var obj2 = obj;
console.log(obj2 == obj); //true 直接复制只是复制对象的指针，还指向同一个对象

//不同的引用
var obj3 = JSON.parse(JSON.stringify(obj));
console.log(obj3 == obj) //false  通过json方法复制后的地址不一样
console.log(obj3);
```

### 二. jQuery extend方法

jQuery.extend(object)

**概述:**
&emsp;扩展jQuery对象本身,用来在jQuery命名空间上增加新函数。

```javascript
var obj = {
    x: 1,
    y: {
        a: 1,
        b: 0,
        c: [1, 2, 3]
    }
};
var obj2 = $.extend({}, obj);
console.log(obj2 == obj) //false  复制后的地址不一样
console.log(obj2);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190109133601460.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)
### 三. Object.create()方法
&emsp;复制对象存在于Object原型prototype中

```javascript
var obj = {
    x: 1,
    y: {
        a: 1,
        b: 0,
        c: [1, 2, 3]
    }
};

var obj2 = Object.create(obj);
console.log(obj2 == obj); //false
console.log(obj2);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019010913361232.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)

### 四. for循环遍历方法


**1. 浅拷贝：** 
&emsp;只是拷贝了基本类型的数据；然而引用类型数据， 只是复制了指针，复制后也是会发生引用。
&emsp;除了这个是浅拷贝，本文章介绍的其他方法都是深拷贝。

```javascript
var obj = {
    x: 1,
    y: {
        a: 1,
        b: 0,
        c: [1, 2, 3]
    }
};

var obj2 = {};

for (var i in obj) { //for in 会遍历对象的属性，包括实例中和原型中的属性。（需要可访问，可枚举属性）
    obj2[i] = obj[i];
}
console.log(obj2);

obj2.y.c.push(4); //给新数组添加一个元素4，会同步反映在新旧数组中
console.log(obj2.y.c); // [1,2,3,4]
console.log(obj.y.c); // [1,2,3,4]  浅拷贝只是复制了地址，修改是内存中的数据
```



**2. 深拷贝**
&emsp;深拷贝, 就是遍历那个被拷贝的对象。判断对象里每一项的数据类型。如果不是对象类型, 就直接赋值, 如果是对象类型, 就再次调用递归的方法去赋值。

```javascript
var obj = {
    x: 1,
    y: {
        a: 1,
        b: 0,
        c: [1, 2, 3]
    }
};

function getClass(o) { //判断数据类型
    return Object.prototype.toString.call(o).slice(8, -1);
}

function deepCopy(obj) {
    var result, oClass = getClass(obj);

    if (oClass == "Object") result = {}; //判断传入的如果是对象，继续遍历
    else if (oClass == "Array") result = []; //判断传入的如果是数组，继续遍历
    else return obj; //如果是基本数据类型就直接返回

    for (var i in obj) {
        var copy = obj[i];

        if (getClass(copy) == "Object") result[i] = deepCopy(copy); //递归方法 ，如果对象继续变量obj[i],下一级还是对象，就obj[i][i]
        else if (getClass(copy) == "Array") result[i] = deepCopy(copy); //递归方法 ，如果对象继续数组obj[i],下一级还是数组，就obj[i][i]
        else result[i] = copy; //基本数据类型则赋值给属性
    }

    return result;
}

var obj2 = deepCopy(obj);
console.log(obj2);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190109133624545.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)

### 五. 原型链继承方法

```javascript
function Father() {
    this.say = "hi";
    this.fn = function () {
        return this.say;
    }
}

Father.prototype.eat = function () {
    console.log('吃');
}

function Son() {
    this.play = function () {
        console.log('play game');
    }
}

//通过原型来继承父类的公共属性
Son.prototype = new Father();
var s = new Son();

console.log(s);
console.log(s.say); //hi
console.log(s.fn()); //hi
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190109133635339.png)