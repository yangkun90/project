var fullNanme='language';
var obj={
    fullNanme:'javascript',
    prop:{
        getFullName:function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName());//this->obj.prop  undefined
var test=obj.prop.getFullName;
console.log(test());//this->window

/////////////////////////////////////////
let a =3,
    b=4;
function A(a) {
    A=function (b) {
        alert(a+(--b));
    };
    alert(++a);
}
A(5);//第一次修改了数组变量名对应的数组 6
A(6);//第二次执行的时候执行的是原来定义在内部的函数体 11

//////////////////////////////
window.val=1;
let json={
    val:10,
    dbl:function () {
        this.val *=2;
    }
};
json.dbl();//this->json this.val=20
let dbl=json.dbl;//function(){this.val *=2}
dbl();//this->window window.val =1*2=2
json.dbl.call(window);//this->json->window 2*2=4
alert(window.val+json.val);//4+20

///////////////////////////////////////
(function () {
    let val =1;
    let json={
        val:10,
        dbl:function () {
            val *=2;
        }
    };
    json.dbl();
    alert(json.val+val);
})();
//json.dbl()->val*2=2   json.val 10  val=2

/////////////////////////////////////////
let test=(function (i) {
    return function () {
        alert(i *=2);
    }
})(2);
test(5);// i=2 i =2*2=4  5是内部函数的参数，但是内部没有接受这个是估计迷惑解答者
////////////////////////////////////////////
let n=2,
    fn=()=>{
        this.n *=3;
        n++;
        return m=>console.log((++n)+m);
    };
let f = fn(4);//4参数没有接受  箭头函数中this取决上下文所以this->window, window.n*3=NaN,n++根据作用域链找到了外层的n 所以n++=3
f(5);//m=5  ++3=4   4+5=9  n=4
fn(4)(5);//这种等于重新开辟一个新的堆用来执行,和f没有关系，n全局为4 ,这里接着 6+5 =11 n=6  ,其实这里等于执行一次外层函数n++，又执行了一次内部函数的++ 等于加了两个1
f(6);//6+6 12 n=7
console.log(n);//7

//////////////////////////////////////////
let fn=function (x=0,y=0) {
    this.x=x;
    this.y=y;
    this.getX=function () {
        console.log(this.x);
    }
};
Fn.prototype.getX=function () {
    console.log(this.x);
};
let f1=new Fn;
//下面等于重置了原型对象
Fn.prototype={
    getY:function () {
        console.log(this.y);
    }
};
let f2=new Fn(1,2);
console.log(f1.constructor === f2.constructor);
f1.getX();
f2.getY();
f1.__proto__.getX();
f1.__proto__.getY();
f2.getX();
f2.getY();
f2.__proto__.getX();
f2.__proto__.getY();
///////////////////////////////////////////////////

let fn1=function () {
    alert(1);
}
let fn2=function () {
    alert(2);
}
fn1.call(fn2);//1
fn1.call.call(fn2);//2
//////////////////////////////////////////////////////
//函数角色 函数 对象 类的三种角色互相不干扰
function Foo() {
    getName=function () {
        console.log(1);
    };
    return this;
};
Foo.getName=function () {
    console.log(1);
};
Foo.prototype.getName=function () {
    console.log(3);
};
var getName=function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
//函数的三种角色 普通函数  对象  类 相互之间互不干扰
