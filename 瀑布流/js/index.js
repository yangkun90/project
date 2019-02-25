/*
瀑布流
效果：多列的不规则的排列，每一列中有很多内容，每一项内容的高度不定，最后我们按照规则排列，三列之间不能相差不多。
    实现：
    首先获取需要的数据
    确定多少列
    每一列多个
    目前高度有的高有的低，接下来不是按照一次插入，而是按照高矮进行排序，哪个最矮，就先给哪个插入内容。以此类推插入数据。
 */
jQuery(function ($) {
    //代码闭包
    let page =0,
        imgData=null;
    let queryData=function () {
       page++;
       $.ajax({
           url:`json/data.json?page=${page}`,
           method:'get',
           async:false,//同步传递数据
           dataType:'json',//服务器获取的json字符串转为对象，jquery内部进行了字符串转对象
           success:function (result) {
                imgData=result;
           }
       });
    };
    queryData();

    //数据绑定
    let queryHTML=function(item={}){
        let {id,pic,link,title}=item;
        if(typeof id ==='undefined') return ''; //这个是空对象的时候进行的判断。返回一个空字符串
        return `<a href="${link}">
             <div><img src="${pic}" alt="${title}"></div>
             <span>${title}</span>
         </a>`;
    };
    let $boxList=$('.flowBox > li'),
        // boxList=[].slice.call($boxList);
        boxList=$boxList.toArray();//jquery 工具方法
    for(let i =0;i<imgData.length;i +=3){
        //这里有个问题因为数据可能不是倍数，那么我们要判断一下就可以了
        let item1=imgData[i],
            item2=imgData[i+1],
            item3=imgData[i+2];
        boxList.sort(function (a,b) {
            return a.offsetHeight-b.offsetHeight;
        }).forEach(function (curLi,index) {
            curLi.innerHTML +=queryHTML(eval('item'+(index+1)));
        });

    }
});
