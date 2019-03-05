/*
  动画
  1 css3动画 能用css3解决的不用js
  transition过度动画
  animation 针动画
  transform 变形依托一种动画实现变形效果

  js 动画
  定时器
  requestAnimationFram js针动画
  canvas 基于定时器完成绘制出图像和效果
 */

//盒子运动到右面
let minL=0,
    maxL=document.documentElement.clientWidth-box.offsetWidth;
//固定步长匀速运动
/*
let step=5,
    autoTimer=setInterval(function () {
        let curl=box.offsetLeft;//左偏移替代一下left
        curl +=step;
        if(curl>=maxL){
            box.style.left=maxL+'px';
            clearTimeout(autoTimer);
            return;
        }
        box.style.left=curl+'px';
    },17);*/
//固定时间匀速运动
let duration=1000,//总时间
    interval=17,//步长不
    begin=0,//开始位置
    target=maxL,//目标位置
    change=target-begin,//总距离
    time=0;//已经运动的时间
let autoTimer=setInterval(function () {
    time +=interval;
    if(time>=duration){
        box.style.left=target+'px';
        clearTimeout(autoTimer);
        return;
    }
    let curl=time/duration*change+begin;
    box.style.left=curl+'px';
},interval);


