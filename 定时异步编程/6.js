/*var box=document.getElementById('box');
animate(box,{
    top:500,
    left:800,
    width:200,
    height:200,
    opacity:0.2
});*/
/*
回调函数
简单来说是把函数作为参数传递，从而影响另一个函数的结果，因为函数本身内部也可以进行处理结果所以，拓展了一个函数的功能设置。
1 根据需求回调函数可以被执行很多次
2 不仅可以把回调函数执行，还可以传递的回调函数传递实参，这样在函数中设置形参接受就可以
3 还可以修改回调函数的this指向
4 可以在宿主函数中接受回调函数的值

 */
// let fn=function (callback) {
//     // callback && callback.call(obj,100,200);//检测callback是不是不为空,不为空就执行
//    let res= callback(10,20);
//    console.log(res)
// };
// fn(function (n,m) {
//     // console.log(n, m);
//     return n+m;
// });
//for each 只能遍历数组  jquery forach可以遍历所有类数组
/*[12,23,34].forEach(function (item,index) {
    console.log(item, index,this);
    //this window
},'haha');//修改了this的指向为haha*/
/*
//在jQuery中
$.each([12,23,23],function (index,item) {
    //this  当前遍历的这一项就是 item
});*/
//obj我们需要迭代的类数组或者对象
//callback 回调函数
let each=function (obj,callback) {
    //验证数据类型
    let flag='length' in obj;//判断是否具有length这个属性，但是不准
    if(flag){
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            let res=callback && callback.call(item,i,item);
            if(res===false){
                break;
            }
        }
    }else{
        for (let key in obj) {
            if(obj.hasOwnProperty(key)){
                let value=obj[key];
                let res=callback && callback.call(value,key,value);
                if(res===false){
                    break;
                }
            }
        }
    }
};
each([12,33,44],function (index,item) {
    //本函数在each这个方法体内被操作了修改了this指向并且增加了两个参数i和item
    // console.log(index, item, this);
    console.log(item);
   /* if(index >=1){
        return false;//return 影响了宿主函数的结果。
    }*/
    // return false;
});
//可以看出来回调函数是一种语法方式通过回调函数可以让两个函数相互影响。
each({name:'yangkun',age:'12',money:123},function (key,value) {
    console.log(key, value,this);
});