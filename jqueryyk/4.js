jQuery(function ($) {
    let $taBox=$('.tabBox'),
        $tabList=$taBox.find('.header>li');

    $tabList.on('click',function () {
        let index=$(this).index();//获取当前点击li的索引
        $(this).addClass('active').siblings().removeClass('active').parent().nextAll().eq(index).addClass('active').siblings('div').removeClass('active');

    });

});