sTouch

> A pure touch lib for mobile.

### 背景

有些很简单很简单的页面,没必要引入zepto,或者其他类库,也没必要用一个很完备的手势库,所以sTouch诞生了...

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
    
    // 可以使用 'tap,doubleTap,singleTap,longTap,swipe,swipeLeft,swipeRight,swipeUp,swipeDown'事件
    testdiv2.addEventListener("swipe",function(e){
        
       /**
        * e {Object} 事件对象
        **/ 
        console.log(e.target.id+"----swipe");
         
    },false);

```


``` javascript
    
    // 可以使用 'tap,doubleTap,singleTap,longTap,swipe,swipeLeft,swipeRight,swipeUp,swipeDown'事件
    
    // 引用sTouch-pro版本
    $('#testdiv2').on('swipe', function (e){
        /**
        * e {Object} 事件对象
        **/ 
        console.log(e.target.id+"----swipe");
    
    });
    
    // 引用sTouch版本
    testdiv2.addEventListener("swipe",function(e){
        
       /**
        * e {Object} 事件对象
        **/ 
        console.log(e.target.id+"----swipe");
         
    },false);

```

