
# 面向对象-构造函数
**目录**
[[toc]]
## 一、构造函数与实例

1. **构造函数**

  &emsp;构造函数主要是一种用于生成对象的饼干模具，这些对象具有默认属性和属性方法，它可以创建多个共享特定特性和行为的对象。 
   
 &emsp;构造函数只是一个函数，但当函数遇到了new，就发生了一些微妙的关系，它会将该函数的this值设置为正在构建的新对象，并且默认返回新创建的对象。

2. **构造函数实例**

 &emsp;在js中，大多数值（不包括原始值）都涉及正在被创建的对象，或者是从构造函数实例化的对象。构造函数返回的对象被称为实例。

举个例子：
```javascript
    var Person = function Person(living, age, gender) {
        this.living = living; //this表示即将创建的新对象
        this.age = age;
    
        this.gender = gender;
        this.getGender = function () {
            return this.gender;
        };
    };
    
    var yangnan = new Person(true, 20, "woman"); //实例化Person对象
    console.log(yangnan); //实例是赋值后的对象 
    
    /*
    Person(){}实例对象拥有_proto_ 指的是构造函数的原型prototype，
	其有constructor，指向构造函数Person
	*/
    console.log(typeof yangnan); //object 实例是对象
    console.log(yangnan.constructor); 
   ```


## 二、构造函数return
1. **return 是值类型会被忽略**
```javascript
function A() {
    this.a = "a"; //构造函数中this绑定新创建的对象，是为改对象添加属性
    return 1;  
}
var a = new A();
console.log(a); // {a:"a"} ,此时值类型1会忽略了，就好像不存在
```
2. **return是引用类型，会覆盖新建的对象**
```javascript
function A() {
    this.a = "a"; 
    return {
        x: 1,
        y: 2
    };
}
var a = new A();
console.log(a); //{x:1,y:2} ，本来实例对象是{a:"a"},return是引用类型覆盖了
```