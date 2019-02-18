/**
 * 1,获取数据和实现数据绑定
 *  =>真实情况中大部分数据都不是写死的都是动态绑定的
 *  A:从服务器端获取到数据（基于ajax/jsonp等技术，通过服务器端提供的数据api接口地址，把数据请求过来）
 *  B: 把获取的数据进行解析
 *  C：把数据绑定到html页面中的（数据绑定）：es6中的模板数据绑定
 **/
let productData = null;
let xhr = new XMLHttpRequest();//创建一个ajax实例
xhr.open('GET', 'json/product.json', false);//打开一个请求的地址 一般是服务器提供的api接口地址,最后一个参数设置同步还是移步，真实中使用异步最多，所以true使用的多.
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;
    }
};
xhr.send(null);
//获取的结果是字符串 json格式
/**
 * json格式：不是一种数据类型而是一种数据格式，只要把对象的属性名用字符串括起来，此时对象不称之为对象而是叫做json格式对象。
 * 服务器端获取的对象基本都是json对象
 * window.JSON
 *  1 parse  json对象的字符串转化为对象
 *  2 stringify  字符串样式的json转化为对象
 */
productData = JSON.parse(productData);
//=>数据绑定：依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的数据和结构放到页面当中
/**
 * 1 字符串拼接
 *   传统字符串拼接
 *   es6模板字符串拼接
 *   模板引擎：原理也是字符串拼接
 * 2 动态创建dom
 *      createElement
 *      appendChild
 *      --操作麻烦，性能消耗更大（dom回流）
 * */
/*
let list=document.getElementById('list');
for (let i = 0; i < productData.length; i++) {
    let item = productData[i];
    let oLi=document.createElement('li');
    list.appendChild(oLi);
}*/
let list = document.getElementById('list');
let str = ``;//es6中的模板字符串
for (let i = 0; i < productData.length; i++) {
    let {title,
        img = 'img/1.jpg',
        price
    } = productData[i];//解构赋值
    str += `<li><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>${price}</span>
        </a></li>`;
}
list.innerHTML=str;