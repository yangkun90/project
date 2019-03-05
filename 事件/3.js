/*
什么是事件的默认行文：
ev.preventDefault
事件本身就是天生就有的，某些事件触发的，即使你没有绑定方法也会存在一些效果，这些效果就是事件的默认行文。
A标签的点击操作就是默认行文 页面跳转 锚点行文
input标签也有自己的默认行文
    1输入内容可以呈现到文本中
    2输入内容的时候会把之前输入的信息呈现出来 不是所有浏览器都有

submit
    1点击按钮页面会立刷新 具有提交表单的效果，我们不需就要阻止默认行文。

 */
//如果阻止默认行文
//1如何阻止A标签的默认行为：我们有的时候使用A标签只是想做一个普通的按钮，点击实现一个功能，不想页面跳转。
//1)使用Javascript:;这种方式
//2)js阻止 我们点击A 标签的时候先触发点击事件，再触发默认行文。
link.onclick=function () {
  ev=ev || window.event;
  ev.preventDefault? ev.preventDefault():window.event.returnValue=false;//使用默认行为阻止默认行为
  return false;//这种return false可以阻止继续执行默认行为。
};
//tempInp是个文本框，如果我们return false 就不允许输入了,可以看出阻止默认行为，是阻止了所有，不是有针对性的.
tempInp.onclick=function (ev) {
    let val=this.value.trim(),//对本去空格处理
        len=val.length;
    if(len > 6){
        this.value=val.substr(0,6);//大于6个字符截取
         // return false;//阻止继续输入
        let code=ev.which || ev.keyCode;
        if(!/^(46|8|37|38|39|40)$/.test(code)){
            ev.preventDefault ? ev.preventDefault():event.returnValue=false;//允许使用删除其他键左一个删选。
        }
    }
};
