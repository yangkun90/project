let $imgList=$('.container>.imgBox>li'),
    $mark=null,
    $container=$('.container');
$imgList.on('mouseover',function (ev) {
    let strSrc=$(this).children('img').attr('src');
    strSrc=strSrc.replace(/_(\d)+/g,'_$1_bigger');
    if(!$mark){
        $mark=$(`<div class="mark clear"><img src="${strSrc}" alt=""></div>`);
        $container.append($mark);
    }

}).on('mouseout',function (ev) {
    if($mark){
        $mark.remove();
        $mark=null;
    }
}).on('mousemove',function (ev) {
    let {top:conTop,left:conLeft}=$container.offset(),
        curL=ev.pageX-conLeft+20,
        curT=ev.pageY-conTop+20;
    $mark.css({
        top:curT,
        left:curL
    });

});