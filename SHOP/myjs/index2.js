//高级单例模式
let productRender=(function () {
    //自执行函数此时的作用域不销毁 有个保存性质，且和外面没有关系
    //获取 ajax数据

    let productData=null;
    let productBox=document.getElementById('list');
    let headerBox=document.getElementById('header');
    let linkList=headerBox.getElementsByTagName('a');
    let productList=productBox.getElementsByTagName('li');

    let getData= function () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET','json/product.json',false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState===4 && xhr.status===200){
                productData=JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };
    //数据绑定
    let bindHTML=function () {
        let str=``;
        productData.forEach((item,index)=>{
            let {title,price,hot,time,img}=item;
            str +=`<li data-time="${time}" data-price="${price}" data-hot="${hot}"><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span>
            <span>时间：${time}</span>
            <span>热度：${hot}</span>
        </a></li>`;
        });
        productBox.innerHTML=str;
    };
    let  bindClick=function () {
        [].slice.call(linkList).forEach((curLink,index)=>{
            curLink.flag=-1;
            curLink.onclick=function () {
                this.flag *=-1;
                let ary=['data-time','data-price','data-hot'];
                productList=[].slice.call(productList);
                productList.sort((a,b)=>{
                    let aInn=a.getAttribute(ary[index]);
                    let bInn=b.getAttribute(ary[index]);
                    if( index===0){//日期单独处理
                        aInn = aInn.replace(/-/g,'');
                        bInn = bInn.replace(/-/g,'');
                    }
                    return (aInn-bInn) * this.flag;
                });
                productList.forEach(curLi=>{
                    productBox.appendChild(curLi);
                });
            };
        });
    };
    return {
        init:function () {
            //init 是当前模块的入口，实现最基础的业务逻辑，具体执行那些方法的执行顺序。（命令设计模式）
            getData();
            bindHTML();
            bindClick();
        }
    }
})();
productRender.init();