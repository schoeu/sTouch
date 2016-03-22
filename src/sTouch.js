/**
 * Created by schoeu on 15/1/12.
 */

void function(window,sTouch){
    'use strict';

    if(typeof define === "function" && define.amd){
        sTouch(window,window.document);
    } else if (typeof exports !== 'undefined') {
        module.exports = sTouch(window,window.document);
    } else{
        sTouch(window,window.document);
    }
}(window,function (w,doc,undefined){
    'use strict';
    var ua = w.navigator,
        isAndroid = /Android/gi.test(ua),
        isIPhone = /iPhone/gi.test(ua),
        isIpad = /iPad/gi.test(ua),
        isMobile = isAndroid || isIPhone || isIpad;
    var hasTouch = "ontouchstart" in w,testEle = doc.createElement('div');
    if(!hasTouch) return;
    var sTouchEvt = "tap,doubleTap,singleTap,longTap,swipe,swipeLeft,swipeRight,swipeUp,swipeDown";
    
    
    /**
    * 当时为了用原生addEventListener方法绑定自定义事件，竟然这样实现的，醉醉的...
    * 现在的一些库基本都是自己实现了on，off等方法。
    * 之后改一版吧
    */
    //原生addEventListener劫持
    if(HTMLElement.prototype.addEventListener){
        var oriAddEvent = HTMLElement.prototype.addEventListener;

        HTMLElement.prototype.addEventListener = function(type,callback,capture){
            //订阅当前事件的DOM元素
            var selfELe = this;

            //如果不是设定范围内事件则走原生绑定函数
            if(sTouchEvt.indexOf(type)<0){
                oriAddEvent.call(selfELe,type,callback,capture);

            }else{ //设定范围内事件处理
                oriAddEvent.call(selfELe,type,callback,capture);
                //初始化事件对象
                var evtObj = new sEvent(type,selfELe);

                var touchStamp = 0,cgStamp=0,oriX= 0,oriY= 0,
                    changeX=0,changeY= 0,isDrag=false,deltaX= 0,deltaY= 0,delta,
                    isSwipe=false;

                //touch事件中，根据条件触发不同的自定义事件
                oriAddEvent.call(selfELe,"touchstart",function(e){
                    touchStamp = e.timeStamp;
                    isDrag = true;
                    oriX = e.touches[0].clientX;
                    oriY = e.touches[0].clientY;

                },false);

                var crtX = 0,crtY = 0;
                oriAddEvent.call(selfELe,"touchmove",function(e){
                    if(isDrag){
                        crtX = e.touches[0].clientX;
                        crtY = e.touches[0].clientY;
                        changeX = crtX - oriX;
                        changeY = crtY - oriY;
                    }
                })

                oriAddEvent.call(selfELe,"touchend",function(e){
                    cgStamp = e.timeStamp - touchStamp;
                    deltaX = Math.abs(changeX);
                    deltaY = Math.abs(changeY);
                    delta = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
                    if(type === "tap" && deltaX < 30 && deltaY < 30){
                        //tap间隔时限符合则触发tap deltaX < 30 && deltaY < 30
                        evtObj.fireEvent();
                    }else if(type.indexOf("swipe") > -1){
                        isSwipe = deltaX > 30 || deltaY > 30;
                        if(type === "swipe" && isSwipe ){
                            //swipe (Math.abs(touch.x1 - touch.x2) > 30) ||(Math.abs(touch.y1 - touch.y2) > 30)
                            isSwipe = true;
                            evtObj.fireEvent();
                        }
                        if(type === "swipeLeft" && changeX < -30 && changeY < 100 ){
                            //swipeLeft
                            isSwipe && evtObj.fireEvent();
                        }
                        if(type === "swipeRight" && changeX > 30  && changeY < 100 ){
                            //swipeRight
                            isSwipe && evtObj.fireEvent();
                        }
                        if(type === "swipeUp" && changeX < 100 && changeY < -30 ){
                            //swipeUp
                            isSwipe && evtObj.fireEvent();
                        }
                        if(type === "swipeDown" && changeX < 100 && changeY > 30 ){
                            //swipeDown
                            isSwipe && evtObj.fireEvent();
                        }
                    }

                    if(type === "longTap" && cgStamp > 750 && delta >= 0 && delta <= 250){
                        //longTap delta > 0 && delta <= 250
                        evtObj.fireEvent();
                    }
                    //恢复标识变量
                    changeX = changeY = deltaX = deltaY = delta = 0;
                    isDrag = false;
                    isSwipe = false;
                },false);
            }
        };
    }

    //事件处理系统
    var sEvent = function(type,ele){
        this.type = type;
        this.fireEle = ele;
        this.evt = null;
        this.initEvent();
    }
    sEvent.prototype = {
        constructor:sEvent,

        initEvent : function(){
            this.evt = doc.createEvent('UIEvent');
            //初始化自定义事件
            this.evt.initUIEvent(this.type, true, true,doc.defaultView);
        },
        fireEvent : function(){
            this.fireEle.dispatchEvent(this.evt);
        }
    };

});

