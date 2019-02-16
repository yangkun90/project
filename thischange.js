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

