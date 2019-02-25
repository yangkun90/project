//设置一个统一的方法设置样式
/*
let css=function (...arg) {
    let len=arg.length;
    if(len>=3){
        setCss(...arg);
        return ;
    }
    if(len===2 && typeof arg[1]==='object' && arg[1]!==null){
        //判断批量操作的时候传入的不是null typeof判断null也是obj
        setGroupCss(...arg);
        return;
    }
    // 剩下的表示获取样式
    return getCss(...arg);
};*/


//其他方式 代码简化
let css = function () {
    let len=arg.length,
        fn=getCss;
    len >=3 ? fn=setCss : null;
    len ===2 && (arg[1] instanceof Object) ? fn=setGroupCss:null;
    return fn(...arg);
};