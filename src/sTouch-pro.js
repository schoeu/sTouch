/**
 * TODO: 更改为on,off事件注册机制
 */

void function (window,sTouch){

    sTouch(window, window.document);

}(window, function (w, doc, undefined){
    'use strict';
    
    // 只限制IOS,安卓和IPAD 不科学
    var ua = w.navigator.userAgent;
    var hasTouch = 'ontouchstart' in w;

    if(!hasTouch) {
        return;
    }

    function STouch(ele) {
        if (typeof ele === 'string') {
            ele = doc.querySelector(ele);
        }
        if (!ele instanceof HTMLElement) {
            throw new Error('wrong arguments');
        }
        return new T(ele);
    }

    function T(ele) {
        this.target = ele;
        this._events = {};
        this._process();
    }

    // 事件&逻辑处理
    T.prototype = {
        _process: function () {
            var ele = this.target;
            var me = this;
            var touchStamp = 0, cgStamp=0, oriX= 0, oriY= 0,
                changeX=0, changeY= 0, isDrag=false, deltaX= 0, deltaY= 0, delta,
                isSwipe=false;

            //touch事件中，检测事件
            ele.addEventListener('touchstart', function(e){
                touchStamp = e.timeStamp;
                isDrag = true;
                oriX = e.touches[0].clientX;
                oriY = e.touches[0].clientY;

            }, false);

            var crtX = 0,crtY = 0;
            ele.addEventListener('touchmove', function(e){
                if (isDrag) {
                    crtX = e.touches[0].clientX;
                    crtY = e.touches[0].clientY;
                    changeX = crtX - oriX;
                    changeY = crtY - oriY;
                }
            });

            ele.addEventListener('touchend', function (e){
                cgStamp = e.timeStamp - touchStamp;
                deltaX = Math.abs(changeX);
                deltaY = Math.abs(changeY);
                delta = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
                if (deltaX < 30 && deltaY < 30){
                    //tap间隔时限符合则触发tap deltaX < 30 && deltaY < 30
                    me._trigger('tap', e);
                    if (cgStamp > 750 && delta >= 0 && delta <= 250) {
                        me._trigger('longTap', e);
                    }
                }
                else if (deltaX > 30 || deltaY > 30) {
                    // 所有的滑动都应该触发swipe
                    me._trigger('swipe', e);

                    if (changeX < -30 && changeY < 100) {
                        //swipeLeft
                        me._trigger('swipeLeft', e);
                    }
                    if (changeX > 30  && changeY < 100) {
                        //swipeRight
                        me._trigger('swipeRight', e);
                    }
                    if (changeX < 100 && changeY < -30) {
                        //swipeUp
                        me._trigger('swipeUp', e);
                    }
                    if(changeX < 100 && changeY > 30){
                        //swipeDown
                        me._trigger('swipeDown', e);
                    }
                }

                //恢复标识变量
                changeX = changeY = deltaX = deltaY = delta = 0;
                isDrag = false;
                isSwipe = false;
            },false);

        },


        on: function (type, fn) {
            if(!this._events){
                return;
            }
            if ( !this._events[type] ) {
                this._events[type] = [];
            }
            this._events[type].push(fn);
        },
        
        // 事件管理机制
        off: function (type, fn) {
            if(!this._events){
                return;
            }
            if ( !this._events[type] ) {
                return;
            }
            var index = this._events[type].indexOf(fn);
            if ( index > -1 ) {
                this._events[type].splice(index, 1);
            }
        },
        _trigger: function (type) {
            if ( !this._events[type] ) {
                return;
            }
            var i = 0,
                l = this._events[type].length;
            if ( !l ) {
                return;
            }
            for ( ; i < l; i++ ) {
                this._events[type][i].apply(this, [].slice.call(arguments, 1));
            }
        }
    };
    
    !w.$ && (w.$ = STouch);
});
