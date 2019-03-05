/*
定时器：设定一个定时器，到设定的时间后，浏览器会把对应的方法执行。
【常用的定时器】
    setTimeout([function],[interval])
    setInterval([function],[interval])
    [function]:到达时间后执行的方法
    [interval]:时间因子，需要等待的时间 单位是毫秒ms

    setTimeout :执行一次 setInterval是执行多次的定时器
 */
//执行了一次
/*
let count=0;
setTimeout(()=>{
    count++;
    console.log(count);
},1000);*/
//每经过一段时间就会执行一次，知道定时器结束
/*let count=0;
setInterval(function () {
    count++;
    console.log(count);
},1000)*/;

/*
清楚定时器：
clearTimeout
clearInterval
这两个方法可以清楚任意定时器，并不是有所对应。
 */
//1 设置定时器有个返回值是这个定时器在浏览器的编号。
//2 清除的时候只需要在clearTimeout([序号]) clearInterval([序号])
//3 序号可以是纯数字，从1开始，表示第一个定时器。。。，但是实际上因为可能操作多个定时器，我们需要单独的命名。
/*let count=0;
var timer=setInterval(function(){
    count++;
    console.log(count);
    if(count===10){
        clearTimeout(timer);//clearTimeout也可以清楚interval的定时器，因为他们都是按照编号去清楚定时器，并不区分是那种定时器。
    }
},1000);*/

