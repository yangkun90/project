/*
es6语法总结:
es6自动采用严格模式的语法方式，不管有没有使用 use strict
严格模式的限制如下：
1 变量必须先声明
2 函数的参数不能有同名属性，否则报错
3 不能使用with语句 （这个语句会改变this的指向而且混合后改变很大）
4 不能对只读属性赋值，否者报错。
5 不能使用前缀0 表示八进制数，否则报错
6 不能删除不可删除的属性
7 不能删除变量 delete prop会报错，只能删除属性 global[prop]
8 eval 不会在他的外层作用域引入变量
9 eval 和arguments不能被重新复制
10 arguments不会自动反映函数参数的变化
11 不能使用arguments.callee
12 不能使用arguments.caller
13 禁止 this指向全局对象
14 不能使用fn.caller和fn.arguments获取函数的堆栈
15 增加了保留字，比如protected.static interface
 */