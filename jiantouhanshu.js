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

