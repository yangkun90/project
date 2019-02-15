## less

> css它是css预编译语言，和他类似的还有sass/stylus...

> css是标记语言不是编程语言，没有类、实例函数变量等东西。而less等编译语言就是让css具备面向对象编程思想。但是浏览器不能直接的识别和渲染less，需要我们把less代码预先编译为正常的css代码后才可以正常解析。

### less的编译

- 在开发环境下编译  导入less.js即可

> rel="stylesheet/less"        导入less的编译js

- 在生产环境下编译

> 生产环境下，不能把less部署，而是把less进行编译成css使用

> 安装less模块：npm install less -g 
>
> 命令编译 ：lessc   xxxx.less   xxxx.min.css -x
>
> 目前基于webpack和框架实现工程化开发的时候，我们都是在webpack配置文件中，配置出less的编译（需要安装less/less-loader等模块）这样不管是开发环境下的预览，还是部署到生产环境下都是基于webpack中的less模块编译的。

### less的基础语法

1. 变量

> 变量存储一个公共值，后期需要使用这个，直接调取变量即可，以后如果值需要修改只需要更改变量的值，那么所有用到这个变量的地方都跟着修改了。
>
> @h @w

2. 层级

> .{
>
> ​	&.cat{
>
> ​      }
>
> }
>
> & 代表的是 上一级的名称不如不加就是默认父子级别 

3.函数

> .trangd(@h,@w){
>
> }
>
> @h 是参数  .trangd作用是为了仿类语法的方式建立函数名

4. 导入

> @import  (reference ) "common";  reference 表示是导入common.less 但是不编译common中，开发中加快编译的速度。

