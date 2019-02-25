//jquery选择器
//1 selector 选择器的类型
//2 context 基于选择器获取元素的上下文
//jquery对象，这个类数组集合中包含了获取到元素
import '../node_modules/jquery/dist/jquery';
// $() 选择器
//.xxx 类选择
/*
jquery对象 类数组
0:div.xxx 这个是原生对象
length 1 这个是类数组的长度
context:document 上下文默认是context
selector:'.xxxx' 这个是输入的字符串选择器
__proto__:jQuery.prototype 原型对象
 */
//如果获取的多个就是保存了多个元素对象，用数组的方式保存下来。length可以直接获取长度 ，所有的按照数组索引从0开始。

//jquery是自己构建的对象，不能使用元素的属性和方法，如果我们要操作就必须使用内部封装的，如果要使用元素就需要转一下
//jquery 类数组中每个数字序属性对应的值就是一个原生对象，这个值就可以直接调用原生的方法。

//分析源码得到
//jquery的选择器支持三种类型 1 普通字符串 2 元素对象 js对象转jquery对象  3函数类型把函数作为另一个函数的参数传递给函数selector(jQuery)
// 有一种高级兼容方式 这样让jquery 的代码和另外的库都不冲突！
// jQuery(function ($) {
//
// });


