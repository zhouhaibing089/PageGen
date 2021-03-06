如何扩展
=======

作为一个库来说，一个比较重要的评价指标便是其扩展性如何，从目前来看，FormGen在扩展性上来说，还是很不错的。

### 扩展输入域

目前内建了以下几种常见类型：

*   `hidden`：隐含域
*   `text`：文本输入
*   `textarea`：大段文本输入
*   `select`：单选
*   `checkbox`：多选

很明显，这几种输入大部分情况下就已经够用了，但是当遇到十分特殊的情况，即上面的几种输入类型都不能解决问题时，就要自己实现一种新的输入类型了。比如说我们需要一种日期类型，虽然比较新的Chrome浏览器已经支持`<input type="date">`，但是考虑到跨平台的可用性，我们基本上还是只能选择使用一些开源组件。

首先我们新建一个文件`field-ext.js`，文件名其实随意，在这只是举个例子而已：

```javascript
/*
 * file: field-ext.js
 */
define(['path/to/field.js', '/path/to/field-util.js', 'path/to/jquery.ui.js'], function(require, exports, module) {

    var Field = require('path/to/field.js');
    var FieldUtil = require('path/to/field-util.js');
    var $ = require('path/to/jquery.ui.js');

    exports.date = function(config, value, callback) {
        // ...
    }

});
```

首先我们添加一个函数名叫`date`，作为一种约定，该函数接收三个参数：**配置**，**值**和**回调函数**。

```javascript
exports.date = function(config, value, callback) {
    config.type = "text";
    // 继承原有的text类型
    Field.text(config, value, function(field) {
        // 此处加上我们自己逻辑
        $(field).datapicker();
        // 执行参数里给定的回调
        callback(field, config);
    });
}
```

是不是很简单呢，你可以看到一种类似的继承实现，并因此而为你省下很多代码，你只需在原有类型的回调函数中加上自己的一些逻辑即可。

```javascript
/*
 * 使用场景中
 */
define(['path/formgen/index', 'path/to/field-ext.js'], function(require, exports, module) {
    var FG = require('path/formgen/index');
    var FieldExt = require('path/to/field-ext.js');

    // 注册上之后即可使用
    FG.registerHandler('date', FieldExt.date);

    // date类型已经可用
    ...
});
```

### 扩展html结构

目前已经实现了两种wrapper类型：`common`和`html`，第一种是我自己在开发过程中所采用的类型，但是考虑到更好的扩展性，我又开发了使用模板来配置html结构的类型，可以说第二种是万能且通用的类型，用户要是有兴趣，觉得需要自己的风格，那也是毫无问题的。

首先我们新建一个文件`wrapper-ext.js`，文件名其实随意，在这只是举个例子而已。

```javascript
/*
 * file: wrapper-ext.js
 */
define(function(require, exports, module) {

    var doc = document;

    exports.mywrapper = function(field, config, callback) {
        var div = doc.createElement("div");
        div.className += 'mywrapper';
        div.appendChild(field);

        if (callback !== undefined) {
            callback(div, config);
        }
    }
});
```

在这个例子中，我只是简单地将`field`元素包在一个`div`里，并且给该`div`加了`mywrapper`这个class。

```javascript
define(['path/to/formgen/index', 'path/to/wrapper-ext.js'], function(require, exports, module) {

    var FG = require('path/to/formgen/index');
    var WrapperExt = require('path/to/wrapper-ext.js');

    // 注册之后即可使用
    FG.registerWrapper("mywrapper", WrapperExt.mywrapper);

    // mywrapper现在已经可用
    ...
});
```

### 扩展验证机制

目前只实现了一个范围的验证机制，因为特殊的验证通常和特殊类型的输入域会挂上勾，所以这个不是一个通用的适合所有输入域类型的功能。所以在开发自己的输入域类型时，若需要特殊的验证机制，需要自行实现之。

话虽如此，不过对于输入域还是需要统一的管理机制，所以对于验证的方法签名还是有些约束。举个例子，假如我们创建了一个图片输入类型：

```javascript
/*
 * file: field-ext.js
 */
define(['path/to/check-ext.js'], function(require, exports, module) {

    var CheckExt = require('path/to/check-ext.js');

    exports.image = function(config, value, callback) {
        // ... 设置输入域信息
        var field = ...;

        // 需要给其添加一个`fg_check`方法
        field.fg_check = function(callback) {
            // 在这我们将其委托出去
            CheckExt.imageCheck(field, config, callback);
        }
    }
});

/*
 * file: check-ext.js
 */
define(function(require, exports, module) {

    exports.imageCheck = function(field, config, callback) {
        // 做具体的验证
        ...
    }
});
```

由于我举的例子不太合适，在这里似乎直接将验证逻辑放在`fg_check`函数中更好一点，但是考虑更远一点，如果一种验证逻辑可以针对一组输入类型，那么将这段验证逻辑放在一个独立的地方将会使代码更好维护。
