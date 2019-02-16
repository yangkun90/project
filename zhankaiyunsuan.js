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

