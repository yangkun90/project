/*
【DOM事件】
1 事件？
    事件就是一件事情或者一个行为，对于元素来说它的很多事件都是天生自带的。只要我们去操作这个元素，就会触发这些行文。
    事件就是元素天生自带的行为，我们操作元素，就会触发相关的事件行为。

2  oBox.onclick=function(){}  这种叫做事件绑定，给元素天生自带的时间行为绑定方法，当事件触发，会把对应的方法执行。

3 元素天生自带的事件？
【鼠标事件】
    click:点击 pc端表示点击 移动端表示单击[移动端使用click会有300ms的延迟]
    dbclick:双击
    mouseover:鼠标经过 鼠标滑动也会多次触发
    mouseout:鼠标移出
    mouseenter:鼠标进入
    mouseleave:鼠标离开
    mousemove:鼠标移动
    mousedown：鼠标按下 按下就会触发，click是抬起的时候触发
    mouseup:鼠标抬起 和mousedown成对
    mousedown和mouseup的优先级大于click，同事设置，最后触发click.
    mousewheel:鼠标滚轮滚动

【键盘事件】
    keydown:键盘按下
    keyup:案件抬起
    keypress和keydown类似，只不过keydown返回的是键盘,keypress返回的是ascii代码值。
    input：由于pc端有物理键盘，可以监听到键盘的按下和抬起，但是手机是虚拟键盘，所以keydown和keyup，在大部分手机都没有，我们用input事件统一替代他们（内容输入事件）
 【表单常用的事件】
 focus:获取焦点
 blur:失去焦点
 change：内容改变
 【其他常用事件】
 load：加载完成
 unload：关闭
 beforeunload:关闭之前
 scroll:滚动事件
 resize：大小改变事件，浏览器窗口改变window.onresize
 【移动端手指事件】
 【单手指操作】
 touchstart:手指按下
 touchmove:手指移动
 touchend:手指移开
 touchcancel:意外情况导致手指操作取消
【多手指操作】
 gesturestart:多手指按下
 gesturechange:多手指改变
 gestureend:多手指离开

 【h5中的auido/video音频视频事件】
 canplay:可以播放
 canplaythrough:资源加载完成,可以无障碍拨号。
 
 */

box.onclick=function () {
    console.log('ok');
};
box.onmousedown=function () {
    console.log('no');
};