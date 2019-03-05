/*
jquery 动画库
 */
let $box=$('#box');
//结束上一个动画，执行下一个动画.
//finish:同stop一样结束正在进行的动画。
//stop 是立即结束动画，保留停止的位置。finish 结束动画，达到要求的位置。在进行下面。带有立即完成的含义。
$box.stop().animate({
    top:300,
    left:50
},500,function () {
    $box.css({
        borderRadius:'50%',
        background:'lightblue'
    });
});
/*
快捷动画
1 show/hide/toggle
2 fadeIn/fadeOut/fadeToggle
3 slideDown/slideUp/slideToggle
指定句体运动时间，可以指定 slow/fast
 */