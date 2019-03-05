## DOM模型总结

### 简单DOM总结

```javascript
getElementById
	上下文只能是document(只有document的原型链上才能找到这个方法)
	ID 重复只能获取一个
    -ie6-ie7中会把表单的name当做id使用
getElementsByTagName
	-获取当前上下文中所有子孙标签中叫做xxxx的元素
getElementsByClassName
	-IE6-IE7不兼容
getElementsByName
	-ie浏览器中只对表单元素的name起作用
	-上下文只能是document
querySelector
querySelectorAll
	-不兼容ie6-8
	-没有DOM映射
document.documentElement
document.body
document.head
[描述节点和节点之间关系的属性]
元素节点 1 大写的标签名 null
文本节点 3 #text  	文本内容
注释节点 8 #comment 注释内容
文档节点 9 #document null
childNodes:所有子节点
children:所有元素子节点，（ie6-8中会把注释当做元素节点)
parentNode 无不兼容问题
previousSibling / previousElementSibling 
nextSibling / nextElementChild
firstChild / firstElementChild
lastChild / lastElementChild
[动态操作dom]
createElement
createDocumentFragment
insertBefore
cloneNode([true])
removeChild
appendChild
set/get/removeAttribute

[散]
xxx.style.xxx=xxx 设置样式
	xxx.style.xxx 获取样式
xxx.className=''
xxx.onclick=function()P{}
...
```

### 盒子模型属性初步了解

```javascript
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

let getCss = function getCss(curEle, attr) {
    if ('getComputedStyle' in window) {
        let val = window.getComputedStyle(curEle, null)[attr];
        let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    }
    throw new SyntaxError('您的浏览器版本比较低，请升级版本');
};
console.log(getCss(document.getElementById('outer'), 'display'));
```

### 盒子模型进一步

```javascript

```

