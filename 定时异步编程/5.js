/*
规定时间的多方向匀速运动
time 当前运动时间
duration 总时间
[记录每个方向的起始、目标、总距离]
begin  开始
target 目标
change 总距离
 */
let time=0,
    duration=1000;
let begin={
    left:0,
    top:0,
};
let target={
    left: document.documentElement.clientWidth-box.offsetWidth,
    top:document.documentElement.clientHeight-box.offsetHeight
};
/*let change={
    left:target['left']-begin['left'],
    top:target['top']-begin['top']
};*/
let change={};
for (let attr in target){
    if(target.hasOwnProperty(attr)){
        begin[attr]=parseFloat(window.getComputedStyle(box)[attr]);
        change[attr]=target[attr]-begin[attr];
    }
}

let animateTime=setInterval(function () {
     time +=17;
     if(time>=duration){
         clearTimeout(animateTime);
         for (let key in target){
             if(target.hasOwnProperty(key)){
                 box.style[key]=target[key]+'px';
             }
         }
         return ;
     }
     let cur={};
     for (let attr in target){
         if(target.hasOwnProperty(attr)){
             cur[attr]=time/duration*change[attr]+begin[attr];
         }
     }
     for (let key in cur){
        if(cur.hasOwnProperty(key)){
            box.style[key]=cur[key]+'px';
        }
     }
},17);





