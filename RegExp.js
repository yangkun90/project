//1,创建正则的两种方式
//let reg1 = /^\d+$/g;
//let reg2 = new RegExp("^\\d+$","g");//构造函数模式

//2 正则两个斜杠之间包起来的都是元字符，斜杠后面的都是修饰符
//let reg =/^\d+$/g;

/*
常用修饰符号
 i:忽略大小写
 g:大写
 m:多行匹配

 常用的元字符
 [特殊元字符]
    \d 0-9之间的一个数字
    \D 取反
    \w 数字.字母.下划线中的任意一个
    \s 匹配任意一个空白字符（包括\t)
    \b 匹配边界符  'zhu' z左和u右就是边界 'yang-kun' 边界分别是两个字母的各个边界一共四个，所以这个边界是字符边界 特殊符号不包括
    \n 匹配一个换行符
    \ 转义字符  有时候需要匹配一些特殊含义的字符为了避免和规则冲突使用 例如：\.这个就不是正则的.符号，而只是一个点符号
    . 代表了除了 \n 以外的所有字符  也可以代表小数点
    ^ 某个元素开头，开头符
    $ 某个元字符结尾
    x|y  x或者y中的任意一个 | 或者
    [xyz] xyz中的任意一个
    [^xyz] 除了xyz中的任意一个^ 此时是非的意思
    [a-z] 获取a-z中的任意一个字符
    [^a-z] 除了a到z字符的任意一个
    () 正则分组
    (?:)当前分组只匹配不捕获
    (?=)正向预查
    (?!)负向预查

 [量词元字符：让其左边的元字符出现多少次]
 * 出现0到多次
 ？ 出现0到1次
 + 出现1到多次
 {n} 出现N次
 {n,} 出现N到多次
 {n,m} 出现N到M次
 [普通元字符]
    只要在正则中出现的元字符，除了特殊和有量词意义外，其余都是普通元字符。
 */

/*
中括号[]的细节：
1 中括号出现的字符一般代表自身含义，除非使用\d \w这些特殊元字符
2 中括号出现的两位数不是两位数而是两个不同的数字，匹配的是两个数字中的任意一个,所以别使用二位数，例：[12-65]表示的是1 和2到6和5，并不是12到65. 解决方法：
(1[2-9])|([2-5][1-9])|(6[1-5]) 再简化(1[2-9])|([2-5]\d)|(6[1-5]) 其实就是范围头两个数字所在10进制范围拆开单独表示，然后之间的区间可以直接在用一段表示。
 */
 /*
 ()的细节作用：
 1 改变默认的优先级
 2 分组捕获
 3 分组引用
  */
/* let reg=/^18|19$/g;
 console.log(reg.test('1819'));//true
reg.test('189');//true*/
//为什么会这种情况，我们理想是18和19数字匹配 是因为这句话实际上是18开头和19结尾的都是符合规范。
//解决上面问题：/^(18|19)$/ 这个使用了改变优先级的作用 以后使用|时候加上()减少正则出现优先级问题 小括号内的代码表示解决了一个要求
// let reg =/^([a-z])([a-z])\2\1$/;//正则中\1代表第一个分组一样的内容 分组应用
// console.log(reg.test('opop'));
//例：匹配身份证
// let reg =/^\d{17}(\d|X)$/;//简单写法
//复杂分组写法 //这种可以获取到这个人的年月日，性别，末尾数等
/*let reg=/^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/;
console.log(reg.exec('340403199010140438'));*/
/*
[ '340403199010140438',
  '340403',
  '1990',
  '10',
  '14',
  '3',
  '8',
  index: 0,
  input: '340403199010140438',
  groups: undefined ]

  获取到的是一个数组：第一个是原字符串，后面的每一项是分组结果。这里体现了分组捕获
    1 正则捕获使用的是exec 方法，如果可以匹配获取的结果是一个数字，如果不能匹配获取的结果是null
    2 如果我们在匹配的时候想获取，大正则中的部分信息，我们可以把这部分用小括号括起来，形成一个分组，这样捕获的时候，不仅可以把大正则匹配的信息捕获到，也可以把小括号的分组匹配信息捕获到。
    3 有的时候写小分组不是为了捕获信息，只是为了改变优先级和分组引用。此时我们可以在分组的前面加上'?',代表只是去匹配，但是不把这个分组内容捕获。
 */

/*
有效数字：
1，正数 负数 0
2，小数 整数
分析规则：
1 可以有 + - 可以没有，也可以有一个
2 整数 0 12 9：一位或者多位，多位数字不能0开头
3 小数部分：可能有可能没有，有小数点后面至少要跟一位数字
 */
// let reg =/^(\+|-)?(\d|([1-9]\d+))(\.\d+)?$/;

/*
电话号码
1 11位
2 1开头
 */
// let reg =/^1\d{10}$/;
/*
中文姓名
1 [\u4E00-\u9FA5]

 */
// let reg=/^[\u4E00-\u9FA5]{2,}(\.[\u4E00-\u9FA5]{2,})?$/;


/*
正则捕获
RegExP 中方法：
exec
1 失败返回null
2 成功返回数组
    0：大正则的内容
    index:正则的起始索引
    input:原始操作的字符串
3 执行一次只能捕获第一个和正则匹配的内容，其余的内容没有捕获到，而且恶心的是，执行多次也没有作用 正则的捕获具有懒惰性，所以使用修饰符号g进行贪婪模式。
test

 */
// let str ='yangkunwoaini123ddfdfd223';
// let reg=/\d+/;
// let reg=/\d+/g;//贪婪模式
// let reg1=/\w+/;
// console.log(reg.exec(str));//匹配失败返回null
// console.log(reg1.exec(str));//成功返回数组
/*
[ 'yangkunwoaini',
  index: 0,
  input: 'yangkunwoaini',
  groups: undefined ]
 */
// RegExp.prototype.myExecAll=function (str) {
//     //str 是传入的字符串
//     //检测字符串是否加了G 否者会永远报错
//     if(!this.global){//正则实例有个global属性，如果不加g就为false ，加了就是true
//         return this.exec(str);
//     }
//     let result =[],
//         valAry = this.exec(str);//第一次执行 this是当前调用正则
//     while (valAry){//this.lastIndex < str.length //lastIndex 记录了当前exec操作的索引 初始0 ，贪婪模式下操作一次就变成找到地方的索引。
//         result.push(valAry[0]);
//         valAry = this.exec(str);
//     }
//     return result;
// };
// console.log(reg.myExecAll(str));

//字符串内置简单方法替代exec  => match
// console.log(str.match(reg));//[ '123', '223' ] 效果来说更加简洁，没有其他索引属性的影响。match是把exec进行了封装


// let str ='yangkun{2018}woai{2019}ni';
// let reg=/\{(\d+)\}/g;
// console.log(reg.exec(str));//和预计一样 分组抓取也获取到了
/*
[ '{2018}',
  '2018',
  index: 7,
  input: 'yangkun{2018}woai{2019}ni',
  groups: undefined ]
 */
// console.log(str.match(reg));//[ '{2018}', '{2019}' ]只获取到了大正则，分组正则没有获取到
/*
取消捕获的贪婪性
 */
// let reg1 = /\d+?/g;
// console.log(reg1.exec(str));//为什么是2 ，因为这个时候?不是特殊元字符，这个时候表示的取消捕获的贪婪性
/*
[ '2',
  index: 8,
  input: 'yangkun{2018}woai{2019}ni',
  groups: undefined ]
 */
/*
 ? 正则的总结：
1.量词元字符，出现0次或者1次。
    如：/-?/
2.取消贪婪性
    /\d+?/ 捕获的时候只获取最短的匹配
3.?:只匹配不捕获
4.?=正向预查
5.?!负向预查
 */

// let reg=/\d+/g;
// console.log(reg.test(str));//true
// console.log(reg.lastIndex);//12  索引改变说明test具有捕获的作用，只是不获取值，且改变了lastIndex索引
// console.log(reg.exec(str)); //如下这里抓到的是2019了
/*
[ '2019',
  index: 18,
  input: 'yangkun{2018}woai{2019}ni',
  groups: undefined ]
 */
/*
根据上面的案例我们要注意一种情况
 */
/*let str ='zhufeng2018';
let reg = /\d+/g;
if(reg.test(str)){
    console.log(reg.exec(str));//null test已经触发了一次捕获了lastIndex的值修改了。
}*/

// let str ='zhufeng2018';
// let reg =/\d+/g;
// console.log(reg.exec(str));//[ '2018', index: 7, input: 'zhufeng2018', groups: undefined ]
// console.log(reg.exec('zhufeng2018zhufengpeixun2019'));//lastIndex的值也改变了，正则对象调用几次exec,index就会改变几次.index记录了第二次查询的时候索引位置是从第24开始

/*
[ '2019',
  index: 24,
  input: 'zhufeng2018zhufengpeixun2019',
  groups: undefined ]
 */

// let str='zhufeng2018peixun2019';
// let reg=/(\d+)/g;
// console.log(reg.test(str));
// console.log(RegExp.$1);//2018 这里说明test就是具有抓取的功能 所有抓取的内容都是放到RegExp中作为一个属性，然后按照编号继续下去,抓取值会覆盖，没啥用
// console.log(reg.test(str));//true
// console.log(RegExp.$1);//2019
// console.log(reg.test(str));//false 这个时候lastIndex超过范围就获取不到了
// console.log(RegExp.$1);//2019 但是只还是记录了上次的

/*
replace 实现正则捕获，本身是字符串替换
 */
// let str='zhufenpeixun2018zhufeng2019';
// str=str.replace('zhufeng','zhufengpeixun');
// console.log(str);
// str=str.replace('zhufeng','zhufengpeixun');
// console.log(str);
/*
上面看到每次都是从第一个字符开始进行替换
需要配合正则去实现效果
 */
/*
replace 原理分析
 */
// let str='yangkun{val:2018}yangkun{val:2019}';
// let reg=/\{val:(\d+)\}/g;//贪婪模式自动识别
// str=str.replace(reg,'@');//yangkun@yangkun@
// str=str.replace(reg,'$1');//$1表示的是分组捕获的第一个 yangkun2018yangkun2019
// str = str.replace(reg,(...arg)=>{ //每次arg执行获取的信息和exec获取的信息一样
//     console.log(arg);
//     // return 'AA';  yangkunAAyangkunAA每次返回时什么就把大正则匹配成啥
// });
/*[ '{val:2018}', '2018', 7, 'yangkun{val:2018}yangkun{val:2019}' ]
    [ '{val:2019}', '2019', 24, 'yangkun{val:2018}yangkun{val:2019}' ]*/
// console.log(str);


/*
事件字符串格式化
 */
let str='2018/4/30 17:50:23';
//split 方法分割
// let ary=str.split(/(?:\/| |:)/g);//?只匹配不去捕获符合这些条件的
// let [,month,day,hours,minutes]=ary;
// str =`${month}-${day} ${hours}:${minutes}`;

//match 方法
//map相对foreach多了返回值，返回的是什么这个值就是什么
let ary=str.match(/\d+/g).map(item=>{
    return item < 10 ? '0'+item:item;
});
// console.log(ary);

//指定事件格式返回阿
let template= '{0}年{1}月{2}日 {3}时{4}分{5}秒 ';
template = template.replace(/\{(\d+)\}/g,function (...arg) {
   /* [ '{0}', '0', 0, '{0}年{1}月{2}日 {3}时{4}分{5}秒 ' ]
    [ '{1}', '1', 4, '{0}年{1}月{2}日 {3}时{4}分{5}秒 ' ]
    [ '{2}', '2', 8, '{0}年{1}月{2}日 {3}时{4}分{5}秒 ' ]
    [ '{3}', '3', 13, '{0}年{1}月{2}日 {3}时{4}分{5}秒 ' ]
    [ '{4}', '4', 17, '{0}年{1}月{2}日 {3}时{4}分{5}秒 ' ]
    [ '{5}', '5', 21, '{0}年{1}月{2}日 {3}时{4}分{5}秒 ' ]*/
    let[,index]=arg;
    return ary[index];
});
// console.log(template);

String.prototype.myFormatTime=function myFormatTime(template='{0}年{1}月{2}日 {3}时{4}分{5}秒 ') {
    let ary=this.match(/\d+/g).map(function (item) {
        return item < 10 ? '0'+item:item;
    });
    return template.replace(/\{(\d+)\}/g,function (...arg) {
        let [,index]=arg;
        return ary[index] || '00';
    });
};
console.log(str.myFormatTime());