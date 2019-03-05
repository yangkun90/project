let $menuBox=$('.menuBox');
$menuBox.on('click',function (ev) {//最大容器监听子的事件
    let target=ev.target,
        $target=$(target),
        tarTag=target.tagName;
    // 合并事件源 如果点击的是em也把当前对象指向span，这样统一了事件触发源，方便后续操作
    if(tarTag==="EM"){
        $target=$target.next();
        target=$target[0];//转成原生js
        tarTag=target.tagName;//这里无论如何把事件源都定到span元素，防止不统一带来的麻烦
    }
    //只有事件源是span才会处理
    if(tarTag=="SPAN"){
        let $ul=$target.next('ul'),
            $em=$target.prev('em');
        if($ul.length===0) return ;//没有下级的ul说明不需要展开
        $ul.stop().slideToggle(200,function () {
            //外层收起里面的小层级也应该收起
            $ul.find('em').removeClass('minus').addClass('plus');
            $ul.find('ul').hide();
        });
        //em样式类名，如果是plus表示展开，如果反之就是合上
        if($em.hasClass('plus')){
            $em.addClass('minus').removeClass('plus');
            // $ul.stop().slideDown(200);
        }else{
            $em.addClass('plus').removeClass('minus');
            // $ul.stop().slideUp(200);

        }
    }
});