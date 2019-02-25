/*
jquery 常用的方法
jquery选择器
jquery 选择器格式
1 HTML元素 如直接 input 这里元素当做字符串放入，这个时候实际上创建了一个input对象 这种一般是把本对象放入到页面中
    $('<div id="a"').appendTo(document.body);
2 选择器  类 ID 子带 多项选择等
 */

/*
each:jquery 用来进行遍历类似 数组 for..each...
1 可遍历数组
2 对象
3 类数组
4 json对象  jquery封装的是分好

jQuery 对象中有这个方法
jQuery 实例中也有
$.each()    $('xxx').each()  内置each   内置each其实就是在获取多个对象的时候，我们在使用一些内置的方法的时候会自动的调取each进行循环操作，这个是jquery做好的。
 */
// let zzz=jQuery.noConflict(true);深度转让jquery名 使用其他名字如zzz去使用jquery对象


// $.ajax(); 内部ajax方法
