/*
insertBefore 是Dom操作元素，试着实现insertAfter
 */
function insertAfter(newEle,originEle) {
    let next=originEle.nextElementSibling,
        par=originEle.parentNode;
    if(next){
        par.insertBefore(newEle,newEle);
    }else {
        par.appendChild(newEle);
    }
}
let link=document.createElement('a');
insertAfter(link,p2);//p2是元素的id，浏览器把具有ID的当做是一个元素节点体


//因为字母和汉子组成的字符串，用正则给英文字母前后加上空格
let str='yangkun杨坤,javascript我爱编程,good study',
    reg=/([a-zA-Z]+)([\u4e00-\u9fa5]+)/g;
//replace是很强大的正则处理函数，因为它可以通过对匹配内容的处理影响最后的结果，这个很贴近真实项目的功能。
str =str.replace(reg,(...arg)=>{
    //arg是数组存储了每次匹配到所有的值包括分组值
   let[,oneVal,twoVal]=arg;
   return ` ${oneVal} ${twoVal}`;//return的是什么就会把本次的大正则匹配的字符串替换成啥
});

//英文首字母大写
let str ='this is your handbag';
let reg=/\b([a-zA-Z]+)\b/g;
str=str.replace(reg,(...arg)=>{
    // console.log(arg[0]);
    let val=arg[0];
    return val.substr(0,1).toUpperCase()+val.substr(1);
});

/*
jquery 原理,怎么扩展插件
原理：是一个类库，里面提供了很多常用的方法，快速开发，兼容所有浏览器。
2015年开始开发向插件开发进行退役，原有的jquery很少使用了。
jquery就是一个类，而$()就是用来创建类对象，实例是基于内置方法makeArray创造的类数组
 */

//观察下面的结果
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    },1000);

}
//定时器是异步编程等循环结束后才会执行定时器的设定的方法，方法执行遇到的I已经是循环结束后的全局I（5）
//下面基于块级别作用域这种方式可以生成多个块级作用域解决了I的值
for (let i =0;i<5;i++){
    setTimeout(function () {
        console.log(i);
    },1000);
}
//基于bind解决i的问题 bind不经可以绑定而且可以传递参数
for (var i=0;i<5;i++){
    setTimeout(function () {
        console.log(i);
    }.bind(null,i),1000);
}



//分析代码写结果
var a={n:4};
var b =a;
b.x=a={n:10};
console.log(a.x);//undefined
console.log(b.x);//{n:10}

/*
对闭包的了解：
闭包就是产生一个私有作用域，在这个作用域的私有变量和外部互相不干扰，而且作用域不销毁，这些私有变量存储的值也保留下来了，所以整体来说闭包就是为了保护和保存变量的一种方式。
实际项目中:
1 循环变量绑定，因为 js 不存在块作用域，var 定义的变量需要通过闭包包裹起来，生成多个内存栈空间，保存i的值。
2 平时业务逻辑的时候基于单例模式来管理代码的，这种方式类似代码的封装。
3 柯里化思想和惰性函数。
 */