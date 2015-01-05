如何扩展
=======

### 扩展td类型

扩展td类型唯一需要做的事情就是写一个函数并且注册成handler:

```javascript
var funcName = function(config, value, callback) {
    // 生成DOM
    var dom = ...
    // 回调
    if (callback) {
        callback(dom);
    } else {
        // 如果没有指定回调，并且无需异步，建议直接返回
        return dom;
    }
};

TableGenerator.registerHandler("xxx", funcName);
```
