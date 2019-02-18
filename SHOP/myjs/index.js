let listBox = document.getElementById('list');
let headerBox = document.getElementById('header');
let linkList = headerBox.getElementsByTagName('a');
let productList = listBox.getElementsByTagName('li');
(function () {
    let productData = null, xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/product.json', false);
    xhr.onreadystatechange = () => {
        xhr.readyState === 4 && xhr.status === 200 ? productData = xhr.responseText : null;
        productData ? productData = JSON.parse(productData) : null;

    };
    xhr.send();

    let str = ``;
    for (let i = 0; i < productData.length; i++) {
        let {title, img, price, time, hot} = productData[i];
        str += `<li data-price="${price}" data-time="${time}" data-hot="${hot}"><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span>
        </a></li>`;
    }
    listBox.innerHTML = str;
})();

(function () {
    //1 获取的是一个对象，不能直接用数组排序方法，需要转化
    let sortList = function () {
        let productAry = [].slice.call(productList);//转化数组 //低版本不兼容
        productAry.sort((a, b) => {
            //a当前项 li
            //b下一项 li
            //获取当前点击A的索引，索引不同排序的方式不同
            let ary = ['data-time', 'data-price', 'data-hot'];
            let aInn, bInn;
            isNaN(a.getAttribute(ary[this.index])) ? aInn = a.getAttribute('data-time').replace(/-/g, '') : aInn = a.getAttribute('data-price');
            isNaN(a.getAttribute(ary[this.index])) ? bInn = b.getAttribute('data-time').replace(/-/g, '') : bInn = b.getAttribute('data-price');
            /*switch (this.index) {
                case 0:
                    aInn=a.getAttribute('data-time').replace(/-/g,'');
                    bInn=b.getAttribute('data-time').replace(/-/g,'');
                    //字符串不能相减所以需要我们去掉-
                    break;
                case 1:
                    aInn=a.getAttribute('data-price');
                    bInn=b.getAttribute('data-price');
                    break;
                case 2:
                    aInn=a.getAttribute('data-hot');
                    bInn=b.getAttribute('data-hot');
                    break;
            }*/
            return (aInn - bInn) * this.flag;//这个this也是DOM对象，箭头函数中的this不能修改，只能根据上下文确定，所以这个时候this就是外层的this,外层的this已经修改为DOM对象，所以箭头函数里的this也是DOM对象。
            //特点如果我们需要改变一个函数中this的指向这个函数就使用老方式定义function ，如果我们希望函数继承上下文的this指向就使用箭头函数。箭头函数没有arguments这个也是特点，箭头函数中的参数操作使用...arg 这种剩余参数的方式进行获取操作.es6减少了原先函数内存栈的复杂度。
        });
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi);//这里利用了Dom的映射机制 如果这个元素原来存在，追加的时候只是修改了位置，原有元素移到末尾
        }
    };
    // sortList();
    //每个link都要绑定点击事件
    for (let i = 0; i < linkList.length; i++) {
        let curLink = linkList[i];
        curLink.index = i;
        curLink.flag = -1;
        curLink.onclick = function () {
            //每次点击都需要让其他的DOM对象的flag属性值重置
            for (let j = 0; j < linkList.length; j++) {
                let item = linkList[j];
                if (item !== this) {
                    item.flag = -1;
                }
            }
            this.flag *= -1;
            sortList.call(this);
        };
    }

    /* linkList[1].onclick = function () {
         this.flag *= -1;
         sortList.call(this);//通过call修改this的指向，这个时候函数sortList的指向是DOM对象
     };*/
})();

/*
dom 中的映射机制
    页面中的html元素，和js中通过相关方法获取到的元素集合或者元素对象存在映射机制，一个改另一个也跟着改
    xxx.style.color='red' color 设置为0 本质是操作js的堆内存   但是由于DOM映射关系页面中的标签和xxx元素对象是绑到一起的，页面中的元素会按照最新的值进行渲染。
    元素绑定前，获取的是一个空的，但是我们绑定数据以后，自动的就会绑定对象到对象中。
    querySelectorAll 是静态集合,不存在在映射机制，所以基于这种方法数据绑定后需要重新的获取一次才可以
    appendChild 增加元素的时候，如果添加的元素已经存在不是克隆而是移到后面。DOM映射机制
 */