# 数组中常用api 
### Array.push() 

依次将内容添加到数组的尾部,并返回新长度 直接在源数组上进行修改

```javascript
var arr = [5, 8, true];
var alength = arr.push('zhangsan', 123, 'lisi'); 
console.log(arr);   // [5, 8, true,"zhangsan", 123, "lisi"]				
console.log(alength);   //返回新长度，6
```



### Array.pop() 

无参数,删除并返回数组的最后一个元素,将数组的长度-1 。若数组为空，则直接返回undefined



```javascript
var arr = [5, 8, 9];
var val = arr.pop();   

console.log(arr);  //[5, 8]					
console.log(val);   // 9
```						


### Array.unshift() 
将元素依次插入到数组的头部，返回数组的新长度，直接修改源数组

```javascript
var arr = [5, 8, true];
arr.unshift('ok', 'ojbk');

console.log(arr.unshift());   // 新数组长度 5
console.log(arr);   //['ok','ojbk',5, 8, true];
```


### Array.shift() 
删除，并返回数组的第一元素，将余下元素的索引前移一位，直接操作源数组

```javascript
var arr = [5, 8, true];
console.log(arr.shift());  //5
console.log(arr);        //[8, true];
```

### Array.sort（） 

排序字符串或者数字：按照字符编码，修改原数组



&emsp;**a 排序字符串**
&emsp;先排第一位：比如abc，则是a先排；之后依次比较其他位

```javascript
var arr = ['aaa', 'abc', 'abb', 'cba', 'aaa']; 
console.log(arr.sort());    //[aaa aaa abb abc cba]
console.log(arr);          //修改原数组：[aaa aaa abb abc cba]

排的顺序如下：
 //aaa abc abb aaa cba  排第一位
 //aaa aaa abc abb cba   排第二位
 //aaa aaa abb abc cba   排第三位
```


&emsp;**b 排序数字**

&emsp;利用sort方法是如下效果，不符合正常的排序逻辑

```javascript
var arr2 = [123, 111, 1, 12, 181];
console.log(arr2.sort());     // 1 111 12 123 181

排的顺序如下：
//111 1 12 123 181
// 1 111 12 123 181
```

&emsp;**实现数字从大到小或者从小到大排序的方法：**

&emsp;&emsp;**a. 用回调函数方法1**

```javascript	
	var arr = [123, 111, 1, 12, 181];
	
	function compare(a, b) {
		return a - b; //升序排列
		//return b - a; //降序排列
	}
	
	arr.sort(compare);
	console.log(arr);   // 1 12 111 123 181
```
&emsp;&emsp;**b. 用回调形式方法2**
&emsp;&emsp;把一个函数作为参数传入,另一个函数的方法就是回调函数

```javascript
	var arr = [123, 111, 1, 12, 181];
	//把一个函数作为参数传入另一个函数的方法就是回调函数
	console.log(arr.sort(function(a, b) {
		return a - b;
	}));             // 1 12 111 123 181
```

### Array.reverse() 
颠倒数组中的所有元素顺序，直接操作源数组

```javascript
var arr = [5, 8, true];

console.log(arr.reverse());  //[true, 8, 5]
```



### Array.toString()
将数组转换成字符串，以","分隔。
返回：新字符，不修改源数组

```javascript
var arr = [5, 8, true,'zhangsan', 123, 'lisi'];
var str = arr.toString();
console.log(str); //5,8,true,zhangsan,123,lisi
console.log(arr);  //[5, 8, true, "zhangsan", 123, "lisi"]
```



### Array.join() 

将数组的每一个元素都转换成字符串，然后连接这些字符串,连接符默认"," 也可以更改为其他，

不修改源数组

```javascript
var arr = [5, 8, true];
var str1 = arr.join()        
console.log(str1);          //"5,8,true"
console.log(arr);          //[5, 8, true]

var str = arr.join("");   //连接符为空
console.log(str);      //"58true"

var str3 = arr.join("-");   //连接符为-
console.log(str3);      //"5-8-true"
```



###  Array.concat() 
依次将内容添加到数组的尾部，并返回新数组，不修改源数组

```javascript
var arr = [5, 8, true];
var arr2 = arr.concat('ok', 123);

console.log(arr);   // [5, 8, true]
console.log(arr2);  //[5, 8, true,'ok', 123]
```



### Array.slice() 
截取并返回数组的一部分，从start到end（不包括end）。如果是负数则从后往前数(截取顺序不变)

**start:**
&emsp;开始数组的小标，-1指最后一个元素，-2值倒数第二个元素
**end：**
&emsp;结束处的数组小标（不包括end本身）;如果是负数，则从尾部算起（不包括本身）

**返回值：**
&emsp;新数组，不修改原数组

```javascript
var arr = [5, 8, true,'zhangsan', 123, 'lisi'];
var arr3 = arr.slice(1);  //从arr[1]]到结尾
console.log(arr3);         //[8, true,'zhangsan', 123, 'lisi'];
console.log(arr);          //[5, 8, true,'zhangsan', 123, 'lisi'];
----------------------

var arr = [5, 8, true,'zhangsan', 123, 'lisi'];
var arr3 = arr.slice(1,4);  //从arr[1]- arr[4](不包括arr[4])
console.log(arr3);         //[8, true,'zhangsan']
console.log(arr);          //[5, 8, true,'zhangsan', 123, 'lisi'];
----------------------


var arr = [5, 8, true,'zhangsan', 123, 'lisi'];
var arr2 = arr.slice(-3,4);  //从倒数第三个 - arr[4](不包括arr[4])
console.log(arr2);         //['zhangsan']
----------------------

var arr = [5, 8, true,'zhangsan', 123, 'lisi'];
var arr2 = arr.slice(1,-1);    //从1到--倒数第一个（不包括本身） 
console.log(arr2);            //[8, true,'zhangsan', 123];
----------------------

var arr = [5, 8, true,'zhangsan', 123, 'lisi'];
var arr2 = arr.slice(-2,-1);   //倒数第2个 --倒数第一个（不包括本身）
console.log(arr2);            //[123];
```




### Array.splice()

&emsp;修改源数组

**语法：**

&emsp;array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

**返回值：**
&emsp;被删除元素数组



&emsp;**a. 传递一个参数的时候：**

&emsp;&emsp;表示从这个参数的位置开始一直截取到最后

```javascript
    var arr = [2,4,6,7,8,9]; 
      //[2,4,6,7,8,9]
    console.log(arr);         

    //参数为2表示从索引下标为2的位置开始一直截取到数组的最后；
    var n = arr.splice(2);   

    //[6,7,8,9]  -splice()返回的是截取到的数组
    console.log(n);     

    //[2,4] -原来的数组结构发生改变，为splice截取之后剩下的数组                
    console.log(arr);              
```
&emsp;**b. 传递两个参数时：**

&emsp;&emsp;传递两个参数，第一个参数表示开始的位置，第二个参数表示要截取的个数；
&emsp;&emsp;如果第二个参数为0，则表示不截取，返回的空数组，原来的数组不变
```javascript	
    var arr = [2,4,6,7,8,9]; 
    console.log(arr);//[2,4,6,7,8,9]
    var n = arr.splice(2,3); //表示从下标位置为2开始截取3个数
    console.log(n); //[6, 7, 8]
    console.log(arr);//[2,4,9]

-----------
    var arr = [2,4,6,7,8,9]; 
    var n = arr.splice(2,0); //表示从下标位置为2开始截取3个数
    console.log(n); //返回空数组[]
    console.log(arr);  //源数组不变[2,4,6,7,8,9]
```

&emsp;**c. 传递三个数组的时候**


```javascript			
    1. 当第二个参数不为0的时候

        var arr = [2,4,6,7,8,9];

        //[2,4,6,7,8,9] 
        console.log(arr); 

        //表示从下标为2的位置开始，删除3个项，在下标为2的位置添加一个数字为5的新项
        var n = arr.splice(2,3,5); 
        
        console.log(n); //[ 6, 7, 8 ]
        console.log(arr); //[2, 4, 5, 9]

    2. 当第一个参数为0的时候
        var arr = [2,4,6,7,8,9]; 

        //[2,4,6,7,8,9]
        console.log(arr); 
        
        //表示在下标为2的位置，截取0个数组，在下标为2的位置添加一个新项
        var n = arr.splice(2,0,5); 

        //不截取，返回空数组[]
        console.log(n);

        //[2, 4, 5, 6, 7, 8, 9]   
        //6这个位置无5的情况下会被删除，因为插入5是在他之前
        console.log(arr);
```