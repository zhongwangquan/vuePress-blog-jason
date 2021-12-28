# 面向对象-原型
## 一、原型和原型对象

1. 函数的原型prototype：函数才有prototype，prototype是一个对象，指向了当前构造函数的引用地址。

2. 所有对象都有__proto__属性， 所有的__proto__ 指向改对象的原型对象（注意：proto前面是两个__）


关系示意图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190105130101373.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)
虚线代表：指针
实线：prototype原型对象

**实例** 
```javascript
    function A() {
        this.a = 1;
    }
    var a = new A();
    var obj = {};
    
    console.log(a.constructor == A); //实例中无constructor属性，在原型中存在，因为指针链接到a.__proto，输出原型的constructor属性A
    
    console.log(a.__proto__ === A.prototype);  //ture 实例的__proto__指向构造函数的原型prototype
                                           
    console.log(A.__proto__ === Function.prototype);//true 构造函数的__proto__指向 Function的原型prototype
    console.log(A.prototype.constructor === A); //true 构造函数原型prototype的constructor属性，指向构造函数
    
    console.log(A.prototype.__proto__ === Object.prototype); //所有的prototype都是Object的实例
    
    console.log(Object.prototype.__proto__ === null); //Object.prototype.__proto__ 是原型链的唯一出口
    console.log(typeof null); //"object"  null是一个空对象指针
```
## 二、原型的创建方式

2.1 **单独添加属性方法**

```javascript

	function Person(){
	}
	
	Person.prototype.name = "Nicholas";
	Person.prototype.age = 29;
	Person.prototype.job = "Software Engineer";
	Person.prototype.sayName = function(){
	    console.log(this.name);
	};
	
	var person1 = new Person();
	person1.sayName(); //"Nicholas"
	
	var person2 = new Person();
	person2.sayName(); //"Nicholas"
	//true  访问的都是构造函数原型prototype的方法
	console.log(person1.sayName == person2.sayName); 
```

![打印结果](https://img-blog.csdnimg.cn/20190105130515115.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzIzOTU4NjI1,size_16,color_FFFFFF,t_70)


2.2 **对象字面量方法**

&emsp;a. 采用{}方式
```javascript
	function Person(name, age, job) {
	    this.name = name;
	    this.age = age;
	    this.job = job;
	    this.friends = ["Shelby", "Court"]; //引用类型属性放在构造函数中
	}
	
	Person.prototype = {
	    constructor: Person,
	    sayName: function () {
	        alert(this.name);
	    }
	};
	
	var person1 = new Person("Nicholas", 29, "Software Engineer");
	var person2 = new Person("Greg", 27, "Doctor");
	
	person1.friends.push("Van");
	
	alert(person1.friends); //"Shelby,Court,Van"  
	alert(person2.friends); //"Shelby,Court" 
	alert(person1.friends === person2.friends); //false
	alert(person1.sayName === person2.sayName); //true
```
&emsp;b.  **构造函数和原型结合**
&emsp;&emsp;构造函数定义属性，原型模式定义方法和共享的属性
```javascript
 function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.friends = ["Shelby", "Court"];  //引用类型属性放在构造函数中
    }
    
    Person.prototype = {
        constructor: Person,
        sayName : function () {
            alert(this.name);
        }
    };
    
    var person1 = new Person("Nicholas", 29, "Software Engineer");
    var person2 = new Person("Greg", 27, "Doctor");
    
    person1.friends.push("Van");
    
    alert(person1.friends); //"Shelby,Court,Van"  
    alert(person2.friends); //"Shelby,Court" 
    alert(person1.friends === person2.friends); //false
    alert(person1.sayName === person2.sayName); //true
    
```
2.3 **class类**
```javascript
	class A {
	    constructor(name) {
	        //构造函数
	        this.name = name; //给新的对象添加一个name属性
	    }
	
	    // sayName相当于 A.prototype.sayName = function(){return this.name}
	    sayName() {
	        return this.name;
	    }
	}
	
	var a = new A('zhangsan');
	console.log(a);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190105132103629.png)
## 三、 原型对象属性为引用类型
```javascript
	function Person() {}
	
	Person.prototype = {
	    constructor: Person,
	    name: "Nicholas",
	    age: 29,
	    job: "Software Engineer",
	    friends: ["Shelby", "Court"],
	
	    sayName: function () {
	        console.log(this.name);
	    }
	};
	
	var person1 = new Person();
	var person2 = new Person();
	
	person1.friends.push("Van");
	
	console.log(person1.friends); //"Shelby,Court,Van"
	console.log(person2.friends); //"Shelby,Court,Van"
	console.log(person1.friends === person2.friends); //true
```