/*
Promise:它是es6中新增加的类，目的是为了管理js中的异步编程，所以我们也把它称为Promise 设计模式。
 */
/*
let p=new Promise();
p.ten();*/
//三个状态 pending(准备)/fulfilled(成功)/rejected(失败)
new Promise(function (resolve,reject) {
    //new Promise 会立即执行 ,但是异步操作不是立即执行，而是等待
    //resolve 异步操作成功我么执行resolve 当异步执行失败reject执行
    setTimeout(function () {
        resolve(100);
    },1000);
    // console.log(1);//立即输出1
}).then(function () {
    //第一个传递进来的函数是resolve
    console.log('ok');
},function () {
    // 第二个传递的是rejected
});
// console.log(2);//再输出2