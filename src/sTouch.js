/**
 * Created by schoeu on 15/1/12.
 */

;(function(window,undefied){
    var sTouch = {};
    sTouch.device = {};
    var ua = window.navigator.userAgent;
    var isIOS = (/IOS/gi).test(ua),
        isAndriod = (/andriod/gi).test(ua),
        isMobile = isIOS || isAndriod;
})(window);