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

### oop

```javascript

```

