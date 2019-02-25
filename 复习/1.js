/*
1 es6 新语法
    let /const
        和es5区别：
        1 let不存在变量提升，不许在声明前使用
        2 let不允许重复声明
        3 在全局作用域中基于let声明的变量不是window的属性和他没关系
        4 typeof 未被声明的变量 不是undefined而是报错（暂时性死区）
        5 let会形成块作用域，类似私有作用域，大部分大括号都会形成块作用域
        。。。
    解构赋值
    ... 拓展、剩余、展开
    箭头函数
        和普通函数区别
        1 没有arguments可以基于...arg获取实参集合结果是一个数组
        2 没有自己的this，this默认是继承了上下文的this
    模板字符串
    Promise(async/awaut)
    class  es6中创建类的
    interator(for of循环)
    Map / Set
    ....
 */
/*
重排（回流）和重绘

浏览器渲染页面的时候，是按照“先创建dom树-加载css--生产渲染树  把渲染树交给GPU渲染叫给浏览器进行绘制”，如果我们后期修改了元素的样式，浏览器会重新把当前元素生成渲染树，然后重新绘制，但是一旦元素的位置或者大小等发生改变，浏览器就要从DOM树重新计算渲染，这个称为重排，无论是重排还是重绘都消耗性能。
劲量减少操作DOM引起的回流和重绘，常用的解决方案：
1 需要动态向页面追加元素的时候，基于文档碎片或者先把需要增加的元素字符串最后统一增加
2 读写分离：把统一的样式都分到一起执行，新版浏览器都有一个自己检测的机制，如果发现紧挨着的操作也是修改元素的样式，会把修改的事先存起来直到遇到非修改样式的操作，会把之前存储的统一执行。

当然还有一些其他的方法，这些事最长使用和注意的。
 */

var str='abc123',
    num=parseFloat(str);//num=>NaN
if(num===NaN){//废话，NaN永远不等于NaN
    alert(NaN);
}else if(num===123){
    alert(123);
}else if(typeof num==='number'){//NaN也是数字类型 所以这里成立
    alert('number');//number
}else{
    alert('str')
}


var a = 'abc'+123+456;
alert(a);//abc123456
var b ='456'-'123';
alert(b);//333
var c=1,
    d='1';
var f=c>d?(c<d?c:d):(c==d?c:d);
alert(f);//1

/*
用户昵称规定只能是数字、大小写字母组成，而且不能少于2位，也不能超过20位，写个正则匹配这个要求
 */
var reg=/(\d|[a-zA-Z]){2,20}/g;


/*
面向对象的理解:
js本身就是面向对象，我们学习的JS本身就是对象的实例和类。
数组是Array的实例，对象是Object的实例。。这些内置类的原型上有着公共的方法，可以被实例进行调用，学习JavaScript就是学习这些方法。
使用：
平时逻辑的开发我们没有刻意的去使用类的方式来做，只有在一些组件或者插件封装的时候才会基于构造函数和原型链使用类和实例去完成，例如我之前封装的一些tab卡轮播图模态框表单验证等插件，就是这样处理的。

语法：
所谓面向对象就是基于class或者function 创建一个类，执行的时候使用new去创建一个实例，这样实例可以调取类上的方法，想要基于面向对象封装插件，必须掌握关于类的继承封装和多态，封装就是提取公共方法，js中没有严格意义的多态，不能进行方法的重写，常用的继承方式有很多，列如：原型继承，call继承，寄生组合继承，es6的继承，有些方式存在一些问题，我项目中后来都是基于class中的extend实现继承。
 */


var point={
    x:10,
    y:20,
    moveTo:function (x,y) {
      var moveX=function(x){
          this.x=y;
      };
      var moveY=function (y) {
          this.y=y;
      };
      moveX(x);
      moveY(y);

    },
};
point.moveTo(100,200);//this->point  point.x=100 point.y=200
console.log(point.x, point.y);


/*
this 的汇总
    this：当前方法执行的主体(谁执行的就执行谁，所以this在哪里创建或者哪里执行的都没有任何关系）
    1 给当前元素的某个事件绑定方法，方法中的this就是当前操作的元素本身

 */
document.body.onclick=function () {
  //this:body
};
/*
2 函数执行看函数前面是否有点，有的话是谁，this就是谁，没有就执向window，如果在JavaScript严格某事下指向是undefined
 */
let fn=function () {

};
let obj={
    name:'哈哈',
    fn:fn
};
fn();//this:window
obj.fn();//this:obj

/*
3 构造函数执行，方法中的this一般都是当前类的实例
 */
let Fn=function () {
    this.x =100;
};
let f=new Fn;
/*
4 箭头函数没有自己的this 就是上下文中的this
 */
let obj={
    fn:function () {
        //this:obj
        setTimeout(()=>function () {
            //this :obj
        },1000);
    }
};
obj.fn();

/*
5 小括号表达式中，会影响this的执向
 */
let sum=function(){

};
let obj={
    fn:function () {
        console.log(this);
    }
};
obj.fn();//this:obj
(sum,obj.fn)();//this.window

/*
6 使用call apply bind 可以
 */
fn.call(obj);//this:obj
fn.call(12);//this:12
fn.call();//this:window 非严格模式下call/apply/bind第一个参数不写或者写null和undefined this都是window 严格模式下写谁this就是谁，不写就是undefined


function fun() {
    this.a=10;
    this.b=function () {
        alert(this.a);
    }
}
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
my_fun.b();//b是私有方法，私有优先级高，所以输出10
my_fun.c();//c是公共方法，所以这里 this.a=30 修改了fun的私有a 30

///////////////////////////////////////////////////////
var n=2;
function a() {
    var n=3;
    function b(m) {
        alert(++n+m);
    }
    b(4);//8
    return b;
}
var c=a(5);
c(6);//11
alert(n);//2

///////////////////////////////////////////////////////////
/*
作用域链和原型链的了解
作用域链：函数执行会形成一个私有的作用域，形参和当前私有作用域中声明的变量都是私有变量，当前的私有有变量具有自我的保护机制，私有变量和外界是没有关系的，但是如果私有作用域中遇到一个非私有的变量，则向它的上级作用域找，如果不是上级作用域私有的，则继续向上查找，一直找到window,这种变量向上查找的机制就是作用域链机制。
原型链：
它也是一种查找机制，实例首先在自己的私有属性中进行查找，如果不是私有的属性，基于__proto__向所属类的原型查找，如果找不到继续向上级查找，一直找到object.prototype的原型对象上，如果还找不到就报undefined.
列如：obj.hasOwnProperty(); 这个是就是找到object原型上的方法。
 */

/*
实现一个$attr(domid ,name,value)遍历id是domid的，内部属性为name，值为value的元素.
 */
let $attr=function (domID,name,value) {
    let tagList=document.getElementsByTagName('*');
    //在获取的所有标签中按照TagNmae进行标签筛选
    tagList=[].slice.call(tagList);
    tagList=tagList.filter(item=>{
        return item.id===domID && item.name===name && (item.innerText===value || item.value===value);// 传统标签的内容不是基于value获取的，而是基于innerText或者innerHTML获取的。
    });
};
$attr('hobbyBox','hobby','music');
let arr=[12,23,34,45,56];
arr.filter((item,index)=>{
    return item>20 && item<40;//filter 不会修改原来的数组而是把符合条件的放到一个新的数组里
});

/*
数组去重有哪些方法
 */
//1 对象键值对的方式
Array.prototype.myUnique=function () {
    let _this=this.slice(),//克隆一份
        obj={};
    for (let i = 0; i < _this.length; i++) {
        let item = _this[i];
        if(typeof obj[item]==='undefined'){
            // _this.splice(i,1);
            _this[i]=_this[_this.length-1];
            _this.length--;
            i--;
            continue;
        }
        obj[item]=true;
    }
    obj=null;
    return _this;
};
//2 依次遍历 消耗内存双循环
Array.prototype.myUnique=function () {
    let _this=this.slice();//克隆一份
    for (let i = 0; i < _this.length; i++) {
        let item = _this[i];
        for (let j = i+1; j < _this.length; j++) {
            if(item===_this[j]){
                _this[j]=_this[_this.length-1];
                _this.length--;
                j--;
            }
        }
    }
    return _this;
};
//3 indexOf方法
Array.prototype.myUnique=function () {
    let _this=this.slice();//克隆一份
    for (let i = 0; i < _this.length; i++) {
        let item = _this[i],
            nextAry=_this.slice(i+1);
        if(nextAry.indexOf(item)>-1){
            _this[i]=_this[_this.length-1];
            _this.length--;
            i--;
        }
    }
    return _this;
};
let ary=[1,2,3,4,2,8,9,1,0];
ary.myUnique(ary);
console.log(ary);

/*
你会的算法？
递归：函数自己调用自己就是递归
 */
/*function fn() {
    // fn();//死递归

}
fn();*/
// 求1-100之间获取3的倍数也是5的倍数
/*
let total=0;
for (let i = 0; i < 100; i++) {
    if(i%15===0){
        total +=i;
    }
}
console.log(total);*/

/*function fn(n) {
    if(n > 100) return;
    if(n % 15===0){
        return n + fn(n+1);
    }
    return fn(n+1);
}
fn(1);*/
//数组扁平化 多维数组 就是多维数组转化一维数组
let ary=[1,[2,[3,[4,5]]],6];
ary = str.replace(/(\[|\])/g,'').split(',');
console.log(ary);
//数组扁平还有一种方式是使用循环判断处理，代码处理清晰。

/*
继承JavaScript
    封装:把实现一个功能的JavaScript代码封装，低耦合高内聚
    多态：
    重载：方法名相同，参数的个数或者类型不同，此时名字相同的叫做方法的重载。js中不存在重载的。
    重写：子类重写父类的方法。
    继承：子类继承父类的属性和方法。
    1 原型继承
    2 call继承
    3 寄生继承
    4 es6中class继承
 */
function A(){
    this.x=100;
}
A.prototype={
    construct:A,
    getX:function () {
        console.log(this.x);
    }
};
function B() {
    this.y=200;
}
B.prototype=new A();//原型继承，子原型指向父类的实例
var f=new B();

//call 继承  父类A作为普通函数执行 改变this为B就相当给B的实例增加一些属性或者方法。缺点是把A当做普通函数，脱离了类的概念和原型上的方法，只是获取A的私有方法。
function A() {
    this.x=100;
}
A.prototype={
    construct:A,
    getX:function () {
        console.log(this.x);
    }
};
function B() {
    A.call(this);
    this.y=200;
}
var f=new B();

//寄生组合继承:A的私有变成B的私有，A的公有变成B的公有

function A() {
    this.x=100;
}
A.prototype= {
    constructor: A,
    getX: function f1() {
        console.log(this.x);
    }
}
function B(){
    A.call(this);//继承A的私有
    this.y=200;
}
// B.prototype=A.prototype;这样可以重写父类上的公共方法
B.prototype=Object.create(A.prototype);
let f=new B();

//es6中继承
class Fn{
    //构造函数
   constructor(n,m){
        this.x=n;
        this.y=m;
   }
   //原型上设置方法 但是不能设置属性
   getX(){
       console.log(this.x);
   }
   //当做一个普通对象设置私有的方法和实例没有关系
   static AA(){

   }
}
class B extends Fn{
    constructor(){
        super();
        this.y=200;//这里设置私有属性
    }
    getY(){
        console.log(12);
    }
}
Fn.prototype.BB=100;//老方法设置属性
let f=new Fn(10,20);
