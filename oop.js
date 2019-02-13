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




