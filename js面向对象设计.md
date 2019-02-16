## js面向对象设计和设计模式理解

### 单例模式模块开发和工厂模式

```javascript
//单例设计模式
//1.表现形式
// var obj ={xxx：xxx,...};
//单例设计中 obj不仅是对象也称之为命名空间
//2.作用把描述从一件事物的属性和特征进行分组和归类,避免全局变量之间的冲突和污染
//var pattern1 = {name:'xxxxx'}
//var pattern2 = {name:'xxxxx'}
//3 单例设计模式命名的由来
//每一个命名空间都是js中Object这个内置基类的的实例，而实例之间是互相独立互相不干扰的，所以我们称它为单例：单独的实例

var obj ={
    xxxx:'xxx'
}
/**
 * 高级单例模式
 *  1,在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个私有作用域。
 * 这个内存栈不销毁，在AA中创建一个堆内存，把堆内存地址赋值给命名空间
 * 2.好处在AA 堆内存中可以存放很多的内容比如变量和函数，那些需要调用，再去暴露这些元素。
 */
var nameSpace =(function(){//惰性函数其实
    var n =12;
    function fn(){

    }
    return {
        fn:fn
    };
})();

/**
 * this
 * 1.给当前元素的某个事件绑定方法，当事触发方法执行的时候this是当前元素对象。
 *  oBox.onclick=function(){
 *      this:oBox
 * }
 * 2.普通函数执行，函数中的this取决于执行的容器,执行主体：方法执行看方法前面是否有点，有的话是谁就是谁，没有this就是window
 *  1.自执行函数this指向就是window.
 *  2.普通函数执行 fn() 执向就是window.
 *  3.对象内部的函数调用就是函数 obj.fn();this就是obj.
 */
//题目分析
var n =2;
var obj = {
    n:3,
    fn:(function(n){
        n*2;
        this.n +=2;//自执行函数指向的是window
        var n =5;
        return function(m){
            this.n *=2;//注意在node环境下全局不在是window 哈哈
            console.log(m+(++n));
        }
    })(n)//自执行函数执行的时候，堆内存还没有存储完成键值对，和obj没有关系，这个时候obj=undefined obj.n报错
};
var fn = obj.fn;
fn(3);//9
obj.fn(3);//10
console.log(n,obj.n);//8,6


//模块开发
//1 解决合作开发的合作问题，方便大家合作，自己开发自己的互相不干扰
//2 各个板块之间，公用的部分进行提取封装，后期再想实现这些功能可以直接调取。


//工厂模式

function createPerson(name,age){
    var obj ={};
    obj.name=name;
    obj.age= age;
    return obj;
}
var p1 =createPerson('xxx',25);
var p2 =createPerson('xxx',25);
```

### oop 和构造函数模式

```javascript
//js本身就是面向对象，连函数都是一个特殊的对象。

//基于构造函数创建自定义类
//1.在普通函数执行的基础上 new xxx() ,这样就不是普通函数执行，这是构造函数执行
//当前的函数名称之为类名，接受的返回结果是当前类的一个实例。
/**
 * 2.自己创建的类名,最好第一个字母大写
 * 3.这种构造函数设计模式执行，主要用于组件、类库、插件、框架等的封装，平时编写不使用这种方式。
 */
function Fn(){


}
var f = new Fn();
var f2 = new Fn();//第二个实例,f和f2独立分开互不影响
console.log(f);//f就是Fn的实例


var obj={};//obj是Object的一个实例
var obj2={};//obj2是Object的一个实例
/**
 * js中创建值有两种方式
 * 1.字面量表达式
 * 2.构造函数模式
 */
var obj ={};//字面量方式
var obj =new Object();//构造函数模式
//不管是哪一种方式创造出来的都是Object的一个实例，而实例之间是独立存在的，
//所以var xxx={} 这种模式就是js种的单例模式

//基本数据类型基于两种不同的模式创建出来的值是不一样的
//基于字面量的方式创建出来的值是基本类型
//基于构造函数创建的的引用类型的数据
//num2是Number()的一个实例，num1也是实例,它只是js表达数字的方式之一，是一种特殊方式,都可以使用数字类提供的方法和属性。

var num1 = 12;
var num2 = new Number(12);
console.log(typeof num1);
console.log(typeof num2);//'object'



//构造函数执行过程
//1 像普通函数一样形成一个私有的作用域 》 栈内存
//   形参赋值 --变量提升--私有变量定义完成
//2  构造函数独有的，js代码自上而下执行前，首先在形成的私有栈创建一个对象（创建一个堆内存：暂时不存放任何东西），并且让函数中的主体（this）指向这个新的堆内存（this===创建的对象）
//3 代码自上而下的执行。
//4 构造函数独有，代码执行完成，把之前创建的堆内存地址返回（浏览器默认返回）。 开始创建的对象就是当前函数的一个实例，代码执行中的this.xxx=xxx都是给实例设置“私有的属性”，最后浏览器会把默认的实例返回，供外面接收
//再次new 就是把上面的操作克隆一份会形成新的内存空间，所以实例独立分开的。
function Person(name,age){
    this.name=name;
    this.age=age;
    var n =10;
}
var p=new Person('张三',18);
console.log(p);

/**
 * 构造函数执行，不写return 浏览器会默认返回创建的实例
 * 但是如果我们写了return 
 *  1.return 是一个基本数据类型，返回的结果依然是类的实例
 *  2.如果返回的是引用值，则会把默认返回的实例覆盖，此时接受到的结果不在是实例
 *  所以最好别返回
 * 
 */
function Fn(){
    var n =10;
    this.m=n;
    //return ; 如果直接return 会强制的结束函数执行，不返回实例
    retrun {name:'哈哈'};//会覆盖返回的实例
}
var f =new Fn();//在构造函数执行的时候如果fn不需要传递实参，我们可以省略小括号
console.log(f);

// instanceof:检测某个实例是否是这个类的。是返回true 不是返回false
console.log(f instanceof Fn);//true
console.log(f instanceof  Array);//true
console.log(f instanceof Object);//true

//in :检测当前对象是否存在某个属性 不管当前的属性是对象的私有还是公有结果只要有就是true。
console.log('m' in f);//true
console.log('toString' in f);//true toString 是公有属性
//hasOwnPeoperty:检测当前属性是否为对象的私有属性，不仅要有，而且必须是私有的才可以
console.log(f.hasOwnProerty('m'));//true
console.log(f.hasOwnProerty('toString'));//false 非私有属性
```

### 原型链解析

```javascript
/**
 * 原型链分析
 * 【函数】
 *      普通函数，类（所有的类：内置类和自己创建的类Array）
 * 【对象】
 *      普通对象、数组、正则、Math、实例也是对象类型（除了基本类型的字面量创建的值）,argument
 *      prototype 的值也是对象类型的
 *      函数也是对象类型的
 *      ....
 * 1,所有函数数据类型天生自带一个属性prototype 属性，这个属性的值是一个对象。浏览器默认给他开辟一个堆内存。
 * 2. 在浏览器给prototype开辟的堆内存当中有一个天生自带的属性叫做constructor 存储的是的当前函数本身
 * 3. 每一个对象都有一个__proto__的属性,这个属性指向当前实例所属类的prototype.(如果不能确定他是谁的实例，都是Obeject的实例)
 */
/**
 * 每个类都把供实例调取的方法存储公共属性方法，存储到自己的原型上(prototype 的作用就是存储一些公共属性和方法供实例调用)
 * Object的__proto__不存在，因为自己本身就是最基础的类不需要指向别人了。
 * 实例调取一个属性或者方法的时候：先查是否是自己私有的，如果没有就去查找是否是公有的，一级一级往上查找，如果都不是就undefined.
 */
function Fn(){
    var n = 100;
    this.AA=function(){
        console.log('AAA[私]');
    };
    this.BB=function(){
        console.log('BB[私]');
    }
}
Fn.prototype.AA=function(){
    console.log('AA公')
}
var f1=new Fn;
var f2 = new Fn;
console.log(f1.n);
//实例设置属性和方法
// f1.name=xxx;给自己设置私有属性
//f2.__proto__.name=xxx; 给原型链上设置公有属性（每个实例都可以使用这个属性）
//函数或者类设置公有属性方法
//Fn.prototype.name=xxxx;
```


### 题目测试

```javascript
//No.1
console.log(a);//undefined
var a =12;
function fn(){
    console.log(a);
    a = 13;
}
fn();//12
console.log(a);//13

//No.2
console.log(a);//报错，全局不存在变量a,只是在window中存在一个属性a
 a =12;
function fn(){
    console.log(a);
    a = 13;
}
fn();//12
console.log(a);//13

//No.3
var foo =1;
function bar() {
    //这里对私有变量进行定义var foo;
    if(!foo){//条件判断不影响私有变量的提升。如果这里面是用let这个进行定义会报错。
        var foo=10;//这里对私有变量赋值
    }
    console.log(foo);//10
}
bar();//10

//No.5  简单闭包
var n=0;
function a() {
    var n =10;
    function b(){
        n++;//n是上面a函数内的变量，所以这里是11
        console.log(n);//11
    }
    b();//11
    return b;//返回的是b的函数体
}
var c = a();//这里c接受了b的函数体，建立地址索引，c不销毁,a的私有栈也不销毁  //这里打印11
c();//在执行的时候n变成11所以这里是12
console.log(n);//这里是外部的变量n =0

//No.6
var a =10,b=11,c=12;
function test(a) {
    //var b;提升变量
    a=1;//a是形参，也是私有.
    var b =2;
    c=3;//这里是全局c
}
test(10);
console.log(a);//10
console.log(b);//11
console.log(c);//3

//No.7
if(!("a" in window)){//in判断一个属性名是否是一个对象的
    var a =1;//这里判断不具有私有作用域，a提升到全局,并且在window中建立一个映射a属性
}
console.log(a);//undefined
//No.8
/*拓展 arguments 的长度是根据传递的实际参数的多少决定的，即使有3个参数，如果我们只传递了一个，这个时候arguments长度也只是1.我们
使用argument索引添加方式也不能增加其长度和增加元素。arguments映射在函数执行后形参赋值的一瞬间，以后无论如何操作都不能改变arguments的长度*/

var a =4;
function b(x,y,a) {
    console.log(a);//a赋值为3
    arguments[2]=10;//利用类数组对象修改为10 //严格模式下是不可以修改arguments的
    console.log(a);//10
}
a=b(1,2,3);//这里执行后  a=3,a=10,
console.log(a);//这里是全局  a接受一个没有返回值的函数所以是undefiend
//开启js的严格模式:use strict
// "use strict";//这里全局开启use strict 团队开发千万不要在全局开启，因为大家不会都按照最标准的语法方式开发
function fn() {
    //这个是在私有作用域中开启
    "use strict";

}

/**
 * 1严格模式下不能使用arguments.callee 和arguments.callee.caller 这两个
 * 2严格模式下arguments没有映射机制  即无法修改arguments中的元素值
 * 3严格模式下对象中的属性不能重名，在语法上会报错。
 * 4严格模式下，函数执行，如果没有明确指定this执行的主体（函数前面没有点），不在指定window而是赋值undefined
 */


//No.9
var foo='hello';
(function (foo) {//形参赋值 foo=hello 变量提升：因为foo已经存在，所以不再声明
    console.log(foo);//hello
    var foo=foo||'word';//foo是形参已经赋值所以 foo='hello'
    console.log(foo);//hello
})(foo);
console.log(foo);//hello

//No.10

var a =9;
function fn() {
    a=0;
    return function (b) {
        return b+a++;
    }
}
var f=fn();//a=0
console.log(f(5));//5   a=1
console.log(fn()(5));//5
console.log(f(5));//5+1=6 a=2
console.log(a);//2

//No.11
var ary=[1,2,3,4];//引用类型
function fn(ary) {
    //这里有形参ary ，然后内部有个私有变量var ary=外部数组地址
    ary[0]=0;//[0,2,3,4]
    ary=[0];//变更了引用
    ary[0]=100;//[100]
    return ary;
}
var res=fn(ary);
console.log(ary);//[0,2,3,4]
console.log(res);//[100]

//No.12
function fn(i) {
    //形参i 类似定义一个私有变量var i=undefined;
    return function (n) {
        console.log(n + (i++));
    }
}
var f = fn(10);//形参赋值i=10
f(20);//n=20  20+10=30  i=11
fn(20)(40);//这里进行重置开辟新的内存栈使用  i=20,n=40 40+20=60
fn(30)(50);//同上  50+30=80
f(30);//i=11，闭包具有保存作用。30+11=41 i=12   开发中的惰性方式

//No.13
var i =10;
function fn() {
    return function (n) {
        console.log(n + (++i)); //这里只是改成前置加好先加后运算
    }
}
var f=fn();
f(20);
fn()(20);
fn()(30);
f(30);

//No.14
var num=10;
var obj={num:20};
obj.fn=(function (num) {
    //var num=obj.num=20;
    this.num=num*3;//私有堆内存this.num=60; this是window 全局num=60
    num++;//私有变量 num=21
    return function (n) {
        //var n ;
        this.num +=n;
        num++;
        console.log(num);
    }
})(obj.num);//注意，对象整体是引用但是他的属性的某个值如果是基本数据类型传入的也是基本数据类型
var fn=obj.fn;
fn(5);//n=5 this.num this为window 全局num60+5=65 内部num++ 22
obj.fn(10);//n=10  this为obj  obj.num=20+10=30  num++ 内部 num=23
console.log(num, obj.num);//65  30

//No.15
//原型解析
/**
 * 1和new Number(1)对比：
 *  前面是基本数据类型
 *  后面是引用数据类型
 *  相同都是数字类型的一个实例
 */

/**
 * 函数类型的：
 *  1.普通函数
 *  2.构造函数
 * 对象数据类型：
 *  1。普通对象
 *  2.Math\Json..
 *  3.类的实例(数组，正则，日期。。）
 *  4.prototype __proto__
 *  5.arguments或者元素集合等类素组
 *  6.函数也是特殊的对象
 *  =>万物皆对象
 */

/**
 * 1.每一个函数都有一个prototype 属性 属性值是一个对象:这个对象中存储了当前类供实例调取使用的公有属性和方法。
 * 2.浏览器默认给原型开辟的堆内存中有一个属性叫做contructer :存储的是当前函数本身
 * 3.每一个对象实例都有一个__proto__原型链属性，这个属性指向当前实例所属类的原型。如果不确定所属类都指向Object.prototype
 */
function Fn() {
    this.x=100;
    this.y=200;
    this.getX=function () {
        console.log(this.x);
    }
}
Fn.prototype.getX=function () {
    console.log(this.x);
}
Fn.prototype.getY=function () {
    console.log(this.y);
}
var f1 = new Fn;
var f2 = new Fn;
console.log(f1.getX() === f2.getY());//false

//No.16
/**
 * 1 元素绑定事件,this是当前操作的元素
 * 2  方法名前面是否有点，有点，点前面是谁this就是谁，没有this是window 严格模式下是undefined
 * 3 构造函数执行，方法体中的this是当前类的一个实例
 *
 * @type {string}
 */
var fullName='language';
var obj={
    fullName:"javascript",
    prop:{
        getFullName:function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName());//this undefined
var test=obj.prop.getFullName();
console.log(test());//这里的点没了所以 this为全局的 language

//No.17
var name= 'window';
var Tom={
    name:'Tom',
    show:function () {
        console.log(this.name);
    },
    wait:function () {
        var fun=this.show;//Tom.show
        fun();//this.window
    }
};
Tom.wait();//window

//No.18
function fun() {
    this.a=0;
    this.b=function () {
        alert(this.a);
    }
}

/**
 * 实际开发中基于面向对象开发的时候:构造原型模式
 * 1,自己开辟的堆内存中没有contructer这个属性,导致类的原型构造函数缺失，解决自己手动增加一个contructer : fun
 * 2,当原型重定向后，浏览器默认的开辟的那个原型堆内存会被释放掉，如果之前已经存储了一些方法或者属性，这些东西会丢失。(所以内置类的原型不允许重定向到自己开辟的堆内存，因为内置类的原型上带有很多操作方法，重置后悔释放掉)
 * @type {{b: fun.b, c: fun.c}}
 */
fun.prototype={
    b:function () {
        this.a=20;
        alert(this.a);
    },
    c:function () {
        this.a=30;
        alert(this.a);
    }
};
var my_fun=new fun();
my_fun.b();//0
my_fun.c();//30

//题目 构造函数和原型链
function Fn() {
    var n =10;
    this.m=20;
    this.aa=function () {
        console.log(this.m);
    }
}
Fn.prototype.bb=function () {
    console.log(this.n);
};
var f1=new Fn;
Fn.prototype={
    aa:function () {
        console.log(this.m + 10);
    }
};
var f2=new Fn;
console.log(f1.constructor);//Fn
console.log(f2.constructor);//undefined
f1.bb();//undefined
f1.aa();//20
f2.bb();//报错 没有
f2.aa();//20
f2.__proto__.aa();//NaN this指向是f2.__proto__  里面没有m所以返回undefined 加上10 返回NaN

//数组去重
//函数方法
function unique(ary) {
    var obj={};
    for (var i=0;i<arr.length;i++){
        var item=ary[i];
        if(obj.hasOwnProperty(item)){
            //删除检测出来重复的
            ary.splice(i,1);
            i--;//防止数组塌陷
            continue;
        }
        obj[item]=item;
    }
    obj=null;//释放obj占用的空间
    return ary;
}
//原型方式 添加一个原型对象公共方法
Array.prototype.myUnique=function myUnique() {
    var obj ={};
    for (var i=1;i<this.length;i++){
        var itme=this[i];
        obj.hasOwnProperty(itme)?(this[i]=this[this.length-1],this.length--,i--):obj[itme]=item;
    }
    obj=null;
    return this;
};

//智力题目
// document.parentNode和 document.parentnode 的区别?
//一个返回值是null 一个是undefined
//规定多人开发函数重名问题


```

### 函数原型链接分析和三种角色分析

```java
//面试题
function Foo() {
    getName=function () {
        console.log(1);
    };
    return this;
}
Foo.getName=function () {
    console.log(2);
};
Foo.prototype.getName=function () {
    console.log(3);
};
var getName=function () {
    console.log(4);
};
function getName() {
    console.log(5);
};
Foo.getName();//2
getName();//执行全局下的getName 4
Foo().getName();//当做普通函数执行，返回的结果再调取getName,return window   1
getName();//1 执行的还是全局下的
new Foo.getName();// 这里Foo.getName是个整体  2
new Foo().getName();//3
new new Foo().getName();//3
//new 也具有执行函数的意思，只不过和普通函数的区别是可以创建一个实例
/**
 * 函数三种角色：
 * 1 普通函数
 *  -堆内存释放
 *  -作用域链
 * 2 类
 *  -prototype 原型
 *  -__proto__ 原型链
 *  -实例
 * 3 普通对象
 *  -和普通的OBJ没啥区别,就是对键值得增删改查
 *
 * --三种角色之间没有必然的关系
 *
 */
function Fn(){
    var n =10;
    this.m=100;
}
Fn.prototype.aa=function () {
    console.log('aa');
};
Fn.bb=function () {
    console.log('bb');
};
//普通函数执行
Fn();//this->window 有一个私有变量n 和原型和属性bb没有关系

//构造函数执行，就是实例化
var f =new Fn();//this:f 当前实例对象
console.log(f.n);//undefined 跟函数中的变量没有关系
console.log(f.m);//100 实例的私有属性
f.aa();//->通过__proto__找到Fn.prototype上的方法
console.log(f.bb());//undefined bb是把fn当中普通对象，和实例没有任何关系

//普通对象
Fn.bb();//这个执行的是当做对象执行对象中对应属性的方法。‘bb’

//这就是函数的三种状态
/**
 * Number() 这个函数
 * 内部有isNaN 这个只能使用Number.isNaN 这是当做普通对象的方式调用
 * prototype上也有方法，如toFixed 这个时候使用数字实例就可以调用toFixed了
 * 其他的内置类也是这种方式，可见，函数这个体本身就是个多状态的生物。
 */
//jquery 这个类库中提供了很多方法，一部分写在原型上的，一部分当做普通对象的属性方法来设置的。


//题目
function Fn() {
    this.n=100;
}
Fn.prototype.getN=function () {
    console.log(this.n);
};
Fn.AA=200;
var f=new Fn();
//所有的内置对象都有__proto__他们都是所属类的实例。object的所属类就是Function.函数类-》对象实例-》_proto_-》函数类的prototype
```

### 原型相关的方法和经验call apply bind的使用

```javascript
/*
* this
* call
* apply
* bind
* */
window.name = '杨坤';
let fn = function () {
    console.log(this.name);
};
let obj = {
    name: 'OBJ',
    'fn': fn
};
fn();//this->window
obj.fn();//this->obj  'OBJ'
let oo = {name: 'OO'};
fn.call(oo);//this->oo
fn.call(obj, 10, 20, 30);//this->obj

/**
 * call  [fn].call([this],[parm]...)
 * 1 fn.call 当前实例通过原型链的查找机制找到Function.prototype上的call方法 =>function call(){[native code]}
 *
 *    fn.call() 能找到的call方法执行
 *   当call 方法执行的时候，内部处理了一些事情
 *   =>首先把要操作的函数中的this关键字变为call方法的第一个传递的实参值
 *   =>把call 方法第二个及以后的实参获取到
 *   =>把要操作的实参执行，并且第二个以后传递进来的实参传给函数
 */
let ary = [1, 2, 3];
ary.slice(0, 3);
Function.prototype.call = function () {
    let param1 = arguments[0], paramOther = [];//除了arg中第一个之外的所有实参获取到 //this:fn 当前要操作的函数
    //把fn中的this关键字修改为PARME1 把call中的this关键字修改为param1(第一个参数就是要执行的对象obj)
    //把fn 执行，把paramOther分别传递给fn
    //this(paramOther)
};
fn.call(obj);//内部的时候this指向的是fn函数体

//难题
function fn1() {
    console.log(1);
}

function fn2() {
    console.log(2);
}

fn1.call(fn2);//1
fn1.call.call(fn2);//2
// Function.prototype.call(fn1);
// Function.prototype.call.call(fn1);
//结论:
// Function.prototype.call()===fn1.call(); 指向的都是同一个方法

/**
 * call 细节
 * 1 非严格模式下，如果不传参数，或者第一个传递的是null/undefined this都是指向window
 * 2 严格模式下，传递的第一个参数是谁，就是谁，包括null/undefined 不穿也是undefined
 */

/**
 * apply 和call基本一模一样，只有一个区别，在于传参方式
 * fn.call(obj,10,20)
 * fn.apply(obj,[10,20]); apply需要把传递给fn的参数放到一个数组或者类数组中，虽然写的是一个数组，但是也相当于一个个传递。
 */

/**
 *bind :语法和call一模一样。唯一的区别是立即执行还是等待执行
 * fn.call(obj,10,20) 改变fn中的this并且fn立即执行
 * fn.bind(obj,10,20) 改变fn中的this,此时fn并没有执行 且不兼容ie6-ie8
 *
 */
let fn = function (a, b) {
    console.log(this, a, b);
};
let obj = {name: "OBJ"};
// document.onclick=fn;//点击时候执行fn
// document.onclick=fn();//绑定的时候执行fn返回值绑定到document的点击事件

//需求：点击的时候执行Fn
document.onclick = fn;//this=>document
document.onclick = fn.call(obj);//我们改变this指向，但是fn已经执行了
document.onclick = fn.bind(obj);//这里即改变了this的指向,而且fn函数也没有执行


```

### es6新语法展开数组对象、拓展数组对象、剩余参数的 ... 使用

```javascript
//获取数组中的最大值
// let arr = [12, 13, 14, 23, 24, 13, 15, 12];
//排序方式
// let max=array.sort(function (a,b) {
//     return b-a;
// })[0];
//假设法 假设第一值是最大值然后依次比较
/*let max = ary[0];
for (let i = 1; i < max.length; i++) {
    let itme = ary[i];
    item > max ? max = item : null;


}
console.log(max);*/

//获取一堆数中的最大值 并不是对一个数组操作
// Math.max(12,13,14,15);
//apply可以拓展原生函数的功能可以传递一个数组给其排序
// Math.max.apply(null,ary);

//es6语法方式 展开运算符完成
// let max=Math.max(...ary);
// console.log(max);

/**
 *解构赋值：按照一个数据值 的结构，快速获取到其中的内容
 * 1 真实项目中一般都是针对数组或者对象进行解构赋值
 * 2
 */
// let value={name:'xxx',age:25,score:[12,23,34,56]};
// let {name:a,score:[b,...c]}=value;
// console.log(a, b, c);
//==========================对象结构赋值=========================
// let obj ={name:'xxx',age:25,sex:0};
// let {name,age,sex}=obj;//对象结构赋值要求，左侧变量要和右侧的属性名一直才行
// console.log(name, age, sex);
// let {sex}=obj;//不需要剩余符号了，直接对应属性
// console.log(sex);
// let {name:nameAA}=obj;
// console.log(name);//name is not defined
// console.log(nameAA);//xxx 看出来其实等于给解构的属性名起别名作为我们使用的变量
// let {friend:friendAA}=obj;
// console.log(friendAA);//undefined 这里对应对象没有这个属性就是undefined

// let {friend=0}=obj;
// console.log(friend);//=>0 给不存在的属性设置默认值
//==========================数组的结构赋值============================
// let ary=[12,23,34];

// let[a,b,c]=ary;
// console.log(a, b, c);//等号左面出现和右面相同的数据结构，左边可以创建一些变量快速的获取到右侧对应位置的值（解构赋值）
// let [a]=ary;
// console.log(a);
// let [,,c] =ary;
// console.log(c);
// let [a,,c]=ary;
// console.log(a, c);
//需求，获取第一项，剩下的作为一个数组返回
// let [a,...b]=ary;
// console.log(a, b);//12 [23,24] ...这里是剩余运算符：除了前面的以外的项，都放到一个数组中
// let [a,...b,c]=ary; 报错，剩余运算符只能处于最后或者单独出现，不能放到中间。注意剩余这个含义。

// let ary = [12];
// let [a, b = 0] = ary;//结构赋值的时候可以赋默认值,如果结构的这一项没有值就赋默认值，如果不赋值就是undefined
// console.log(a, b);//12 0

// let a =12,b=13;
//交换位置
// let c=a;
// a=b;
// b=c;
// console.log(a, b);

//坐标方式交换
// a=a+b;
// b=a-b;
// a=a-b;
// console.log(a, b);

//解构方式交换
// [a,b]=[b,a];
// console.log(a, b);

/**
 * "..." es6语法中三个点有三种含义
 * 1.剩余运算符
 * 2.拓展预算符 拓展数组，对象等内部值
 * 3.展开运算符 数组(对象/类数组集合)中的每一项展开  xxx,xxx,xxx
 **/
// let ary=[12,23,34];
// let [...arg]=ary;//=>ary.slice(0)
// function fn(context,...arg) {
//     //获取传递中第一个和剩下的
//     console.log(context, arg);//arg是数组，arguments是类数组
// }
// let obj={};
// fn(obj,10,20,30,40);//{} [ 10, 20, 30, 40 ]
// function sum(...arg) {
//     //传递几个实参，arg中就存储多少个，此时的arg和arguments一样的，区别是arg是一个数组,arguments是一个类数组
// }
//展开运算
// let ary=[12,23,34];
// let fn=function (a,b,c) {
//     console.log(a,b,c);
// };
// // Math.max(...ary);//Math.max(12,23,34)
// fn(...ary);//=>fn(12,23,34)

// let obj={name:'xxx',age:20};
// let newObj={...obj,sex:0};
// console.log(newObj);//{ name: 'xxx', age: 20, sex: 0 }

/*
let ary=[12,23];
let newAry=[...ary,100];
console.log(newAry);//[ 12, 23, 100 ]*/


/**
 * 编写一个方法fn，实现任意数（去除数字中的最大和最小，然后再算平均数)
 * 
 */
// let fn=function () {
//     //arguments是类数组
//     //1.先给arguments排序 不能使用
//     //2.剩下的值求和，除以总长度，求出平均数
//     let ary=[];
//     for (let i = 0; i < arguments.length; i++) {
//         ary.push(arguments[i]);
//     }
//     ary.sort(function (a,b) {
//         return a-b;
//     });
//     ary.pop();
//     ary.shift();
//     //然后求和
//     let total=0;
//     for (let i = 0; i < ary.length; i++) {
//         total += ary[i];
//     }
//     return (total/ary.length).toFixed(2);
// };
//改良版
/*let fn=function(){
    let ary=[].slice.call(arguments);//类数组借用数组原型上的方法执行实现相关的操作 借用slice 实现类数组转化为数组
    ary.sort(function (a,b) {
        a-b;
    }).pop();
    ary.shift();
    return (eval(ary.join('+'))/ary.length).toFixed(2);
};
console.log(fn(10, 9.8, 9.5, 9.2, 9));*/

// Array.prototype.mySlice=function () {
//     var newAry=[];
//     for (let i = 0; i < this.length; i++) {
//         newAry.push(this[i]);
//     }
//     return newAry;
// };
// let ary=[12,23,34];
// console.log(ary.mySlice());

//ES6方式
// let fn=function(){
//     // let arr = [...arguments];//类数组转为数组
//     let ary =Array.from(arguments);
//     ary.sort(function (a,b) {
//         a-b;
//     }).pop();
//     ary.shift();
//     return (eval(ary.join('+'))/ary.length).toFixed(2);
// };
// console.log(fn(10, 9.8, 9.5, 9.2, 9));

// let fn=function(...ary){
//     ary.sort(function (a,b) {
//         a-b;
//     }).pop();
//     ary.shift();
//     return (eval(ary.join('+'))/ary.length).toFixed(2);
// };
// console.log(fn(10, 9.8, 9.5, 9.2, 9));


```

### es6新语法箭头函数的使用

```javascript
/*
let fn =(x,y)=>{

};
fn(10,20);*/
//只有一个形参我们可以省略括号
/*
let fn =x=>{

};
fn(10);*/
//如果函数体只有一句话可以省略{}
/*let fn=function () {
    return x+y;
};*/
/*
let fn=(x,y)=>x+y;
console.log(fn(10,20));*/
//=> 符号记住之前的是函数的参数，后面的是函数的体 ,有几个=>就有几个函数内嵌
// let fn=x=>y=>x+y;
// var fn=function (y) {
//     return function (y) {
//
//     };
// };

//1,箭头函数中没有arguments
/*
let fn=(...arg)=>{
    // console.log(arguments);
    console.log(arg);//arg作为剩余参数获取一个参数组成的数组,这个比arguments还好用
};
fn(10,20,30,40);*/

//2.箭头函数中没有自己的执行主体 this,它的this都是继承上下文中的this。
/*let obj={
    fn:(function () {
        let _this=this;//_this是window
        return function () {
            console.log(_this);//这里的_this是window
        }
    })()
};*/
// obj.fn();//->this 指向是obj  如果我们让obj执行this也是window
//obj.fn.call(window)

let obj={
    fn:(function () {
        return ()=>{
            console.log(this);
        }
    })()
};
obj.fn();//箭头函数执行和前面是谁都没有关系了，因为它没有自己的执行主体，在箭头函数中this都是直接找上下文中的this来使用。


```

