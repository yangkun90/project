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


