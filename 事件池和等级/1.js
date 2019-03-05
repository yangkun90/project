/*
jquery事件绑定方法：
on/off 就是基于DOM2事件绑定方法 兼容了所有的浏览器
one: 只绑定一次，执行后就立即移出这个方法。
click/mouseover 这些方法都是基于on/off完成的。
delegate 事件委托方法（1.7 版本以前是live方法）在大容器统一处理子的事件冒泡。
bind/unbind 正常绑定 就是使用DOM0 的方式了
 */
let fn=function (ev){
    console.log(ev);
};
$(document).on('click',fn);//绑定
// $(document.documentElement).off('click',fn);//移出
$(document).delegate('#box','click',fn);//把#box的事件委托，委托给元素document。