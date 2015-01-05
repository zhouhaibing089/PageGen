如何扩展
=======

### 扩展Dom元素

我们就以如何应用`FormGenerator`来作为示例

```javascript
var form = function(config, parent, callback) {
    var form = doc.createElement("form");
    // 能尽早插入到dom中，就尽早做这件事情
    if (parent) {
        $(parent).append(form);
    }
    // 加载值，此处只是举例，实际可能不是这个样子
    load(config.dataUrl, function(value) {
        var fg = new FormGenerator(config, value);
        fg.build(form, function(ret) {
            if (callback) {
                callback(ret);
            }
        });
    });
};
```
