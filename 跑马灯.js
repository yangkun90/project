let wrapper = document.querySelector('.wrapper');
let wrapperList=document.querySelectorAll('li');
let frg=document.createDocumentFragment();
[].forEach.call(wrapperList,item=>{
    frg.appendChild(item.cloneNode(true));
});
wrapper.appendChild(frg);
frg=null;
wrapper.innerHTML +=wrapper.innerHTML;
utils.css(wrapper,'width',utils.css(wrapper,'width')*2);
setInterval(()=>{
    let curl =utils.css(wrapper,'left');

    utils.css(wrapper,{
        left: --curl
    });
    //当我们ul距离左偏移已经是整个wrapper的一般就重置
    if(Math.abs(wrapper.offsetLeft) >=utils.css(wrapper,'width')/2){
        utils.css(wrapper,'left',0);//立即回到起始的位置
    }
},13);