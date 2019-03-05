/*
事件监听
DOM0级 事件监听
[element].onxxx=function(){}
DOM2级事件监听
[element].addEventListener('xxx',function(){},false);
[element].attachEvent('onxxx',function(){}) [ie6-8]
目的：给元素某个事件绑定方法，不管是 DOM0还是DOM2都是为了触发元素的相关行文的时候，能做点事情（也就是把绑定的方法执行），不仅把方法执行了，而且浏览器还给方法传递了一个实参信息值。这个值就是事件对象


 */
box.onclick=function (ev) {
    //定义一个形参用来接受浏览器传递的值 这个值可能是MouseEvent鼠标对象，如果是可以输入内容的元素获取的是KeyborardEvent键盘事件对象
    //这些信息中包含了当前操作的许多属性名和属性值，这些值包含了当前操作的基础信息 ，列如，鼠标点击位置的x/y坐标，鼠标点击的是谁（事件源头）等。
    console.log(ev);
};
window.onload=function (ev) {
    //这里是 Event事件对象，最原始的对象
    console.log(ev);
};
/*
常用事件对象
【鼠标事件对象】
ev.target 事件源（操作元素）
ev.clientX /ev.clientY:当前鼠标触发点距离当前窗口上角的x/y轴坐标
ev.pageX / ev.pageY:当前鼠标触发点距离BODY(第一屏幕)左上角的x/y轴坐标
ev.preventDefault();阻止默认行为
ev.stopPropagation();阻止事件冒泡行为
ev.type:当前事件类型
【键盘事件对象】
ev.code 当前按键‘keyE’
ev.key 当前案件 'e'
ev.which / ev.keyCode[ie用的] :当前案件的键盘码
    let code=ev.which || ev.keyCode; 兼容处理
【常用的键盘码】
左-上-右-下  37 38 39 40
backspace：8 删除
enter:13
space:32
del:46
shift:16
alt:18
ctrl:17
esc:27

f1-f12 112-123

0-9 48-57


【兼容问题】
ie6-8下 事件对象没有传递到绑定的方法形参中，需要使用window.event去获取，由于是全局属性，鼠标每次操作都会把上次操作的值替换掉。
window.event.srcElement 获取事件源
ev.target=event.srcElement
window.event.type 获取事件类型
低版本浏览器中不存在window.event.pageX/Y
window.event.clientX/Y 和高级浏览器一样
由于低版本没有pageX
所以有兼容处理
ev.pageX=event.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft);
ev.pageY=event.clientY+(document.documentElement.scrollTop || document.body.scrollTop);
preventDefault & stopPropagation 低版本没有所以
ev.preventDefault=function(){window.event.returnVale=false;}
ev.stopPropagation=function(){window.event.cancelBubble=true}
 */

/*
简单兼容处理：
自己使用什么处理什么
 */
box.onclick=function (ev) {
    ev = ev || window.event;
    var target=ev.target || ev.srcElement;
    ev.preventDefault ? ev.preventDefault():ev.returnValue=false;
};