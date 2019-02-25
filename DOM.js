/*
js盒子模型属性
在JS中通过相关属性可以获取设置元素的样式信息，这些属性就是盒子模型属性

client
  top
  left
  width
  height
offset
  top
  left
  width
  height
  parent
scroll
  top
  left
  width
  height
 */
//=>client
//1.clientWidth clientHeight:获取当前元素可视区的宽和高
/*
第一不包括padding 和 broder纯粹是内容content的可视宽度和高度 如果内容溢出，宽度和高度也不会改变
总结：设定的值+padding 如果不设置 默认是内容撑开大小+padding
 */
//获取当前页面一屏的高度和宽度
// let a=document.documentElement.clientHeight || document.body.clientHeight
// let b=document.documentElement.clientWidth || document.body.clientWidth

//2 clientTop  clientLeft:获取 上/左边框的宽度

//3 offsetWidht offsetHeight:在clientWidth 基础上加上border  和内容溢出也没有关系

//4 scrollWidth和scrollHeight 真实内容的宽度和高度，不一定是自己设置的值，因为可能出现内容溢出的情况，有内容溢出要把溢出的内容也算上。而且是一个约等于的值。
//1 没有内容溢出的时候和client系列一样，有内容溢出的时候只是显示真实内容的高度和宽度
//2 scroll 系列在不同浏览器下也不一样，而且各个浏览器对描述也不一样。

// let a=document.documentElement.scrollWidth || document.body.scrollHeight
// let b=document.documentElement.ScrollWidth || document.body.scrollWidth


/*
盒子模型获取属性的特点
1 获取的都是数字不带单位
2 获取的都是整数不会出现小数 可能出现四舍五入
3 获取的结果都是复合样式值，好几个元素的样式组合在一切的值。如果只想获取独立的值，比如padding，我们的盒子模型属性就操作不了。真实的项目中这种情况其实挺多的
 */
//获取样式的某个值
//1.[元素对象].style.xxx 操作  只能获取行内上的样式，不写在行内无论怎么样都获取不到
//2 获取当前元素所有经过浏览器计算的样式
//经过计算的样式：只要当前元素可以在页面中呈现，那么他的样式都是被计算出的。
//=>不管你的样式写到哪儿
//=>不管你是否写了，浏览器默认会给一些元素一些默认的样式
//标准浏览器：window.getComputedStyle([元素],[伪类，一般都写null]) 被浏览器计算过的元素[对象]
//老浏览器：[元素对象].currentStyle 获取计算后的样式

// let getCss = function getCss(curEle, attr) {
//     if ('getComputedStyle' in window) {
//         let val = window.getComputedStyle(curEle, null)[attr];
//         let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
//         reg.test(val) ? val = parseFloat(val) : null;
//         return val;
//     }
//     throw new SyntaxError('您的浏览器版本比较低，请升级版本');
// };
// console.log(getCss(document.getElementById('outer'), 'display'));



/*
offsetParent 当前盒子的父级参照物
offsetTop / offsetLeft 获取当前盒子距离级参照物的偏移量（上偏移和下偏移）
1 默认的父级参照物是body  body的父级别参照物是null
2 修改参照物 zIndex 这个属性对定位有作用所以我们要对元素设置定位改变参照物。
 */
/*utils.css(outer,{
   position:'relative', //这里设置后 inner和center 的参照物就是outer了
});*/
//总结：参照物是外层最近定位的元素。
//距离：外边框到父定位元素边框的距离 这个offsetLeft 和offsetTop就是根据这个获取距离的
// utils.css(inner,{
//     position:'absolute',
//     top:-100,
//     left:-100
// });

//不管你的父参照物是谁我们都要获取到当前元素到body的偏移量
//1 不能修改既定样式，不能基于position修改。
// 获取任何元素的偏移距离BODY的值我们发现规律
//1 自己的左偏移  + 累加所有定位的父参照物的左偏移+边框值 加到父参照物是body停止  这个时候就是总偏移值

//=>offset：获取当前元素距离BODY的偏移(左偏移和上偏移)
/*
let offset = function (curEle) {
    //1.先获取当前元素本身的左/上偏移
    let curLeft = curEle.offsetLeft,
        curTop = curEle.offsetTop,
        p = curEle.offsetParent;

    //2.累加父参照物的边框和偏移(一直向上找,找到BODY为止,每当找到一个父参照物都把它的边框和偏移累加起来,根据元素不一样,具体找几次也不知道)
    //TAG-NAME获取当前元素的标签名(大写的)
    while (p.tagName !== 'BODY') {//=>当找到的父参照物是BODY结束查找和累加操作
        //3.把找到的父参照物的边框和偏移值累加起来
        curLeft += p.clientLeft;
        curLeft += p.offsetLeft;
        curTop += p.clientTop;
        curTop += p.offsetTop;
        p = p.offsetParent;//=>基于当前找到的父参照物继续向上查找
    }

    return {
        top: curTop,
        left: curLeft
    };
};*/

// console.log(utils.offset(inner));

/*
scrollTop / scrollLeft :指的滚动条卷去的宽度或者高度。
最小卷去值：0
最大卷去值：真实页面的高度 - 一屏幕高度  document.documentElement.scrollHeight-document.documentElement.clientHeight

操作浏览器的盒子属性，我们一般都要写两套，用来兼容各种模式下的浏览器
 */

//=>操作浏览器盒子模型属性的
let winHandle = function (attr, value) {
    if (typeof value !== 'undefined') {
        //=>设置盒子模型属性值:SCROLL-TOP/LEFT
        document.documentElement[attr] = value;
        document.body[attr] = value;
        return;
    }
    return document.documentElement[attr] || document.body[attr];
};
