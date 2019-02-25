/*
优秀的类库jQuery
1 类库jQuery /zepto 提供真实开发中用的方法。根据自己的业务逻辑合理的调用类库中封装的方法。
2 插件 具备一定业务功能的，比如轮播图，选项卡，模态窗，进行功能级别的封装，以后要使用的时候就直接导入。 swiper\iscroll\jquery-dailog\jquery-drag\jquery-datepicker\echarts
3 UI 组件 把结构 css js 全都封装好，我们实现功能直接导入进来。偶尔需要修改一下样式 bootstrap
4 框架 具备一定的编程思想，需要我们按照框架的思想进行开发，一般框架中提供了常用的类库方法，提供了强大的功能插件，有的也提供了UI组件.
react vue angular backbone sea.js require.js
 */
(function () {
    var version='1.11.3',
        jQuery=function (selector,context) {
            return new jQuery.fn.init(selector,context);//创建init的实例其实就等于创建jquery的实例，后面让init.prototype=jquery.prototype
        };
    //jquery是一个类在它的原型上提供了很多的属性和方法，提供jq实例去调用
    jQuery.fn=jQuery.prototype={
        jQuery:version,
        constructor:jQuery,//当前类的原型重定向后，自己开辟的堆内存中没有contructor,需要手动增加
        //...
    };
    //jquery 原型上增加 extend方法  jquery这个类同事本身也是个对象，在对象上增加一个属性值extend这个属性赋值是一个方法
    /*
    jquery 是一个类也是一个普通对象：函数的两种角色   拓展：函数的三种角色：普通函数 类 对象
    1 放到jQuery原型上的 jQuery.fn这里面的方法是供jquery实例调用的
    2 把jquery 当做一个普通对象，对象上设置普通的方法和属性，这类方法以后要使用的时候直接 jQuery.xxx() 就可以执行了
     */
    jQuery.extend=jQuery.fn.extend =function () {
        /*
        extend  把对象中的属性和方法拓展到指定的对象上
         */
    };
    //下面两个定义后我们知道拓展jquery的方法，就可以使用Jquery 的extend拓展
    //普通内置方法拓展
    jQuery.extend({
        isFunction:function (obj) {

        },
        isArray:function (obj) {

        }
    });
    //原型方法拓展
    jQuery.fn.extend({
        find:function () {

        }
    });
    //方法拓展
    var init=jQuery.fn.init=function (selector,context) {
        
    };
    init.prototype=jQuery.fn;//把init 当做一个类，但是让这个类的原型指向jquery的原型 init 这个类最后其实找到的还是jquery原型的方法 init的实例其实也可以理解为jquery的实例

    window.jQuery=window.$=jQuery;
})();

$().isFunction();
