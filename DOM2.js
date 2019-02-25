//设置样式封装一个方法控制
let setCss =function (curEle,attr,value) {
    /**
     * 细节处理
     * 1 考虑兼容问题 透明度低版本不使用opacity,而是filter
     * 2 如果传递进来的value没有带单位我们要根据情况设置px
     */
    if(attr==='opacity'){
        curEle.style.opacity=value;
        curEle.style.filter=`alpha(opacity=${value * 100})`;
        return;
    }
    if (!isNaN(curEle)){
        let reg=/^(width|height|fontSize|(margin|pdding)(top|left|right|bottom)?)$/i;
        reg.test(attr) ? value +='px':null;
    }
    curEle['style'][attr]=value;
};
// setCss(document.getElementById('outer'),'width',600);
// 对象封装多个设置样式方法统合
let setGroupCss=function (curEle,options={}) {
    for (let attr in options) {
        if(!options.hasOwnProperty(attr)){
            break;
        }
        setCss(curEle,attr,options[attr]);
    }
};
// setGroupCss(document.getElementById('outer'),{
//     width:4000,
//     height:4000
// });
/*
for in
1 for in只能遍历内置私有的属性，不能遍历公有的属性。
2 浏览器内置的属性一般都是不可枚举的属性。
3 自己在prototype上写的属性也是可以枚举的属性，for in 的时候也有
4 一般来说 for in 的时候我们加一个私有属性的验证，只有是私有的属性我们做处理
obj.hasOwnProperty(key)
 */