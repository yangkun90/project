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



```
