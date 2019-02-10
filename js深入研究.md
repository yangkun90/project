## js深入研究

```javascript
var a =12;
//1.先声明一个变量 a 没有赋值默认赋值是undefined
//2.在当前作用域中开辟一个位置存储12这个值
//3.让变量a和12关联在一起（定义：赋值）
var b =a;
//交换的只是具体数值拷贝一份过去，而不是地址。
b =13;
console.log(a);

var ary1 = [12,23];
//对象数据本身比较复杂，解析器在堆内存中开拓一个空间用来存放对象数据中的键值对，然后再栈内存管理的是堆内存的地址。
var ary2 =ary1;
//这里赋值的其实堆内存地址
ary2.push(100);
console.log(ary1);

function sum(){
    var total=null;
    for(var i=0;i<arguments.length;i++){
        var item=argument[i];
        !isNaN(parseFloat(item)) ? total +=item:null;//这里排除了非数字的影响,parseInt parseFloat方法也行
    }
    return total;
}
//方法的名存储在内存栈中，方法体存放在堆内存中使用字符串的方式进行保存。
sum(12,32,34,'bb')
```

### 栈内存作用

1. 提供一个给代码自上而下的执行环境，代码都在栈内存中执行的
2. 由于基本数据类型比较简单，他们都是直接在栈内存中开辟一个位置，把值直接存进去的。
3. 当栈内存销毁，那么基本数据类型值也被销毁。

### 堆内存作用

1. 存储引用类型值得，对象键值对，函数：字符串代码
2. 当前堆内存销毁释放，那么这个引用值彻底没有了
3. 如何让堆内存销毁？当堆内存没有被任何栈内存的变量占用。代码回收GC会在空闲的时候回收 （谷歌浏览器包括v8）
4. null空对象内存指针，变量重新赋值。销毁堆内存

## 变量提升

定义：当栈内存形成，js代码自上而下执行前，浏览器首先会把所有带有'var/function' 关键子的进行提前的声明或者定义。

这种预先处理机制称之为变量提升。

声明： var  function 一个变量表示声明

定义： a=12  定义其实就是赋值

带var 是只定义没有定义

带function 声明和赋值都完成了   `解释了为什么函数定义在后面可以在前面调用的原因`

变量提升只发生在当前作用域（例如：开始加载页面的时候只对全局作用域下的进行提升，因为此时函数中存储的都是字符串而已）

在全局作用域下声明的函数或者变量是全局变量，同理在私有作用域下声明的变量是私有变量

浏览器很懒，不会执行第二遍，也就是当代码遇到创建函数这部分代码后直接跳过即可，因为在提升阶段就已经完成函数的赋值操作了

私有作用域形成后不是立即马上执行，而是进行变量的提升（变量提升前，形参赋值）

在es6语法以前版本，只有函数具有私有作用域。

### 带var 和不带var

全局作用域下定义变量等于给window对象添加一个属性变量值就是属性值(私有作用域中声明的私有变量和window没有关系) 

`in`  判断变量是否是某个对象的一个属性

`'a' in window` 判断某个属性名是否是window对象的属性返回值是true和false

全局变量和win中的属性存在映射机制

如果不加var 本质可以看作是对window这个对象的属性操作`a=12  => window.a=12`

创建变量要加上var 因为概念不一样

`var a=b=12` 这样写b不带var

### 私有作用域下的带var和不带var

1. 带var 的私有作用域变量提升阶段，都声明为私有变量，和外界没有任何关系
2. 不带var 不是私有变量，会向它的上级作用域查找，看是否为上级的变量，不是继续向上一级查找，一直找到window 如果window也没有，就会在window中增加一个属性，这个时候等于在全局中增加了一个变量
3. 这种查找的机制叫做作用域链查找

### 作用域链的拓展

```javascript
function fn(){
    b =13;
    console.log(a,b);//作用域链查找的过程中如果window也没有这个变量相当给window设置一个属性叫做b
}
fn();
console.log(b);
```

### 条件判断下变量提升的处理和函数表达式不提升

```javascript
fn();//=>fu not function  //原因：函数表达式不做提升而是在执行到这个函数的时候才开始执行
sum();
//匿名函数之函数表达式
var fn=function(){//变量提升只是提升了函数本身
    console.log(1)
}
//普通函数
function sum(){
    console.log(2)
}
fn();
sum();

//当前作用域下不管条件是否成立都会变量提升
//1.带var 的还是只声明
//2.带function的在老版本浏览器机制下，声明加定义都处理，但是为了迎合es6的块级作用域，新版本浏览器对于函数，不管条件是否成立，都只是先声明，没有定义，类似var.
console.log(a)//undefined
if(1===2){
    var a=12;
    
}
console.log(a)//undefined

面试题
f = function(){return  true;}//不带var 等于window.f
g = function(){return false;}//不带var 等于window.g
~function(){
    if(g() &&[]==![]){//1新版浏览器变量提升只提升不赋值，这里报错，2老版本提升赋值。3，[]==![]是true 分析，第一![]强转bool因为[]为true，取反就是false，此时一边是数组一边是布尔，不同类型转为数值,用Number()进行转换，这个时候实际上两边都是0==0 返回为true.g()执行返回也是true，true==true 所以判断继续执行. 4 f没加var 则根据作用域链向外面找，这个时候发现外面的f有，这个时候赋值改变了最外层f这个函数表达式的值。5最后执行的时候发现f()返回的事true
        f=function(){retrun false;}
        function g(){return true;}
    }
}();
console.log(f())
console.log(g())
//新版本浏览器对函数：变量提升只提升不赋值。老版本浏览器函数：提升且赋值。
//运算符优先级比较运算比如 ==要大于&&这种关系运算符号，所以先执行的是[]==![] ,同事!是贴身运算符类似++ -- 这种优先级比比较运算还高，所以![]已经做了bool转换.
//贴身符号>数学>比较关系>逻辑关系>赋值

坑爹行为：
console.log(fn);//这里新版本只提升不定义，所以执行的时候为undefined
if(1===1){
    console.log(fn);//这里大坑。当判断成立的时候，进入到大括号里，这里不是立即执行代码，而是进行类似作用域提升的操作，把fn函数在{}中进行定义和赋值。这个时候执行就返回函数体了。
    function fn(){
        console.log('ok')
    }
    
}
console.log(fn)//赋值了所以为函数体
```

### 变量和函数重名问题

```javascript
/*
*1 带var 和FUNCTION关键字声明相同的名字，这种也算是重名了（其实一个fn存储的值的类型不一样）
*/
var fn =12
function fn(){
    
}
//2关于重名的处理：如果名字重复了不会重新的声明，会重新的定义（重新赋值）【不管是变量提升还是代码执行阶段】
fn()
function fn(){console.log(1);}
fn()
function fn(){console.log(2);}
fn()
var fn =100;
fn()  //这里fn变成变量 fn not a function 不能作为函数执行
```

### es6中的let的使用

```javascript
//在es6中基于let/const等方式创建变了或函数，不存在变量提升机制。
let a =12;
let fn =()=>{
    
}
//es6中变量不能进行提升声明，如果在全局window中也不会添加这个属性，即切断了变量和window属性的映射机制
//相同的作用域中不能重复的声明相同名字的变量
let a = 23;
let a = 21;//报错不能重复声明
//在es6中在代码执行前会进行代码检测，如果不符合规范就会报错，而不是以前的代码边执行检测错误后报错的问题。参照了后台语音的代码检测机制，这种机制就是语法检测。

```

### 暂时性死区

```javascript
var a =12;
if(true){
    console.log(a);//a is not defined a没有定义
    let a =13;//let会形成一个块级私有作用区域 这里会进行语法检测，发现块内有新语法，就会安新语法的方式进行操作。这里只会对a 变量进行新语法的限制。
}

console.log(typeof a)//"undefined" 检测一个未被声明的不报错，而是赋值undefined

console.log(typeof a)//如果检测到当前的有es6新语法就会按照新版本的语法方式,这里语法直接报错
let a;
```

### 全局变量和私有变量

```javascript
var a =12,b=13,c=14;
function fn(a){
    console.log(a,b,c);//12,undefined,14
    var b =c =a=20;//这里b是私有变量，然后c和a是外部的全局
    console.log(a,b,c);//20,20,20
}
fn(a);
console.log(a,b,c);//12,13,20
//在私有作用域中只有两种情况是私有变量
//1 声明过的变量（带var/function)
//2 形参也是私有变量
//剩下的都不是自己私有的变量，都需要基于作用域的机制向上查找
```

### 关于私有变量的练习

```javascript
var ary = [12,32];
function fn(ary){
    console.log(ary);
    ary[0]=100;//ary是私有变量但是指向是外部的定义的数组堆内存，所以修改也会影响外面。
    ary=[100];//这里等于创建一个新的堆内存，进行了私有变量ary的指向修改
    ary[0] =0;
    console.log(ary);
}
fn(ary);
console.log(ary);
```

### 查找上级作用域

```javascript
//当前函数的执行，形成一个私有的作用域A，A的上级作用域是谁，和他在哪里执行的没有关系，和他在那创建定义的有关系，在哪创建，他的上级作用域就是谁
var a =12;
function fn(){
    console.log(a);
    console.log(arguments.callee.caller)//caller指向的是函数执行的环境
}
function sum(){
    var a =120;
    fn();
}
sum();


测试
var n =10;
function fn(){
    var n =20;
    function f(){
        n++;//21
        console.log(n);//21
    }
    f();//print 21
    return f;
}
var x =fn();
x();//print 22 //这里f实在fn中定义的，所以f记住了定义环境。所以操作的是fn中的私有变量
x();//p 23
console.log(n);//p 10
```

### 堆栈内存的销毁问题

```javascript
堆内存：存放引用数据类型值，对象键值对，函数是代码字符串
栈内存：提供js代码执行的环境和存储基本数据类型
堆内存释放
	让所有引用内存空间地址的变量赋值为null即可
栈内存释放 每个函数都会形成一个栈内存环境，es6出现了块级作用域
	一般情况下，当函数执行完成，所形成的私有作用域都会自动释放，但是也有特殊情况
    1 函数执行完成，当前形成的栈内存中，某些内容被栈内存以外的变量占用了。
    2 全局栈内存只有在页面关闭的时候才会释放掉 比如window
    ...
    如果当前栈内存没有被释放，那么值钱在栈内存中存储的基本值也不会释放，能够一直保存下来
var i =1;
function fn(i){
    return function(n){//临时不销毁
        console.log(n+(++i))
    }
}
var f=fn(2);
f(3);//6
fn(5)(6);//12
fn(7)(8);//16
f(4);//这里i是上级作用域4+4=8 f(3)执行过一次，这个时候私有i已经变成3了



```

