//当前是个公有方法库常用的方法都封装到这里
let utils =(function () {
    //获取对象css
    let getCss = function getCss(curEle, attr) {
        if ('getComputedStyle' in window) {
            let val = window.getComputedStyle(curEle, null)[attr];
            let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
            reg.test(val) ? val = parseFloat(val) : null;
            return val;
        }
        throw new SyntaxError('您的浏览器版本比较低，请升级版本');
    };
    //设置单一css样式
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
    //获取多个css样式
    let setGroupCss=function (curEle,options={}) {
        for (let attr in options) {
            if(!options.hasOwnProperty(attr)){
                break;
            }
            setCss(curEle,attr,options[attr]);
        }
    };
    //css操作总合方法
    let css = function () {
        let len=arg.length,
            fn=getCss;
        len >=3 ? fn=setCss : null;
        len ===2 && (arg[1] instanceof Object) ? fn=setGroupCss:null;
        return fn(...arg);
    };
    return {
        css //es6中 如果属性名和属性值一样可以  等于css:css
    }

})();
