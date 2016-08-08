sTouch

> A pure touch lib for mobile.

### 背景

有些很简单很简单的页面,只是需要一些手势或点击，没必要引入zepto等其他类库,也没必要用一个很完备的手势库,所以sTouch诞生了...

### 支持的事件

- tap
- doubleTap
- singleTap
- longTap
- swipe
- swipeLeft
- swipeRight
- swipeUp
- swipeDown

### 使用示例

``` javascript
    
    // 引用sTouch-pro版本
    // 可以使用 'tap,doubleTap,singleTap,longTap,swipe,swipeLeft,swipeRight,swipeUp,swipeDown'事件

    $('#testdiv2').on('swipe', function (e){
        /**
        * e {Object} 事件对象
        **/ 
        console.log(e.target.id+"----swipe");
    });

```

