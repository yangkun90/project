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
