/*
1鼠标进入和鼠标离开mark
2 控制mark在其中的移动，但是不能操作范围
3 当mark在移动的时候，根据移动距离的比值，在大盒子里面移动正好是反向三倍
 */
$(function () {
  var $magnifierBox=$('.magnifierBox'),
      $smallBox=$magnifierBox.find('.smallBox'),
      $mark=$magnifierBox.find('.mark'),
      $bigBox=$magnifierBox.find('.bigBox'),
      $bigImg=$bigBox.find('img');
    //1控制显示隐藏
    $smallBox.on('mouseenter',function (ev) {
        $mark.add($bigBox).show();
        computedMark(ev);
    }).on('mouseleave',function () {
        $mark.add($bigBox).hide();
    }).on('mousemove',function (ev) {
        //让mark跟着鼠标
        //jquery的ev事件对象做了处理兼容
        computedMark(ev);
    });

    function computedMark(ev) {
        //注意这里offset获取的是偏移量 left 和 top
        //outerHeight获取的是内容区域宽度和边框空白总合
        //innerHeight 获取的是内容区域，不包括边框和空白
        var offsetObject=$smallBox.offset(),
            //curL和curT是时时距离盒子边界的值。
            curL=ev.pageX-offsetObject.left-$mark.outerWidth()/2,
            curT=ev.pageY-offsetObject.top-$mark.outerHeight()/2;
        var minL=0,
            minT=0,
            maxL=$smallBox.innerWidth()-$mark.innerWidth(),
            maxT=$smallBox.innerHeight()-$mark.innerHeight();
        //边界判断 思路：不能比最大值大，且不能小于最小值，正常值就正常使用。大于最大的强制改为最大的，小于最小的强制变为最小的。
        curL=curL<minL?minL:(curL>maxL?maxL:curL);
        curT=curT<minT?minT:(curT>maxT?maxT:curT);
        $mark.css({
            top:curT,
            left:curL,
        });
        //大盒子改变大图的位置
        $bigImg.css({
            top:-curT*3,
            left:-curL*3
        })


    }
});
