let  bannerRender=(function () {
    let container=document.querySelector('#container'),
        wrapper=container.querySelector('.wrapper'),
        focus=container.querySelector('.focus'),
        arrowLeft=container.querySelector('.arrowLeft'),
        arrowRight=container.querySelector('.arrowRight'),
        slideList=null,
        focusList=null;
    //轮播图基础参数
    let stepIndex=0,//记录当前展示块的索引步长
        autoTimer=null,//定时器变量
        interval=1000;//定时器周期时间
    /**
     * 索引为1 展示第二张，wrapper的left -1000...
     */
    let autoMove=function autoMove(){
        stepIndex++;
        if(stepIndex >= slideList.length){
            utils.css(wrapper,'left',0);
            stepIndex=1;
        }
        //基于动画匀速运动过来
        animate(wrapper,{
            left:-stepIndex *1000,
        },200);
        // utils.css(wrapper,'left',-stepIndex*1000);
        //改变焦点
        changeFocus();
    };

    //获取数据
    let queryData=function queryData() {
      return new Promise(function (resolve,reject) {
          let xhr=new XMLHttpRequest;
          xhr.open('GET','json/banner.json');
          xhr.onreadystatechange=function () {
            if(xhr.readyState===4 && xhr.status===200){
                let data=JSON.parse(xhr.responseText);
                resolve(data);
            }
          };
          xhr.send(null);
      });
    };

    //绑定数据
    let bindHTML=function bindHTML(data) {
        let strSlide =``,strFocus=``;
        data.forEach(function (item,index) {
            let {img,desc}=item;
            strSlide +=`<div class="slide"><img  src="${img}" alt="${desc}"></div>`;
            strFocus +=`<li class="${index===0 ? 'active':''}"></li>`;
        });
        /*strSlide += `<div class="slide"><img  src="${data[0].img}" alt="${data[0].desc}"></div>`;*/

        wrapper.innerHTML=strSlide;
        focus.innerHTML=strFocus;
        //获取所有逇slideList和Focus
        slideList=wrapper.querySelectorAll('.slide');
        focusList=focus.querySelectorAll('li');
        //克隆第一份
        wrapper.appendChild(slideList[0].cloneNode(true));
        slideList=wrapper.querySelectorAll('.slide');
        //动态计算li的长度不固定
        utils.css(wrapper,'width',slideList.length*1000);
    };

    //焦点对其
    let changeFocus=function changeFocus() {
        //因为stepIndex是公共索引，不能随便修改，所以用个临时值存储
        let tempIndex=stepIndex;
        //这里注意，如果是最后一张，因为是克隆的需要对应真实第一张，需要修改一下索引
        tempIndex===slideList.length-1 ? tempIndex=0:null;
        [].forEach.call(focusList,function (item,index) {
           item.className=index===tempIndex?'active':null;
        });

    };
    //鼠标进入离开控制暂停和开启 且显示两个左右切换按钮
    let handleContainer=function handleContainer() {
        container.onmouseenter=function () {
          clearInterval(autoTimer);
          arrowLeft.style.display=arrowRight.style.display='block';
        };
        container.onmouseleave=function () {
            autoTimer=setInterval(autoMove,interval);
            arrowLeft.style.display=arrowRight.style.display='none';

        };
    };
    //点击焦点实现切换
    let handleFocus=function handleFocus() {
        [].forEach.call(focusList,function (item,index) {
            item.onclick=function () {
                stepIndex=index;//点击哪个焦点就改变这个焦点的索引
                animate(wrapper,{
                    left: -stepIndex *1000,
                },200);
                changeFocus();
            };
        });
    };
    //两个按钮切换时间
    let handleArrow=function handleArrow() {
        arrowRight.onclick=autoMove;
        arrowLeft.onclick=function() {
          stepIndex --;
          //索引小于0表示是第一张了不能再向右移动了
            if(stepIndex <0){
                utils.css(wrapper,'left',-(slideList-1)*1000);
                stepIndex=slideList.length-2;
            }
          animate(wrapper,{left:-stepIndex*1000},200);
          changeFocus();
        };
    };
    return {
        init:function () {
            let promise=queryData();
            promise.then(bindHTML).then(function () {
                //开启自动轮播
                autoTimer=setInterval(autoMove,interval);
            }).then(function () {
                //左右焦点切换
                handleContainer();
                handleFocus();
                handleArrow();
            });
        }
    }
})();
bannerRender.init();
