PageGenerator 接口文档
=====================

### PageGenerator

**设置事件**

```javascript
setEvents(event);
```

`event`: 其中event是一个对象，它是一堆函数集合，像下面这样:

```javascript
{
    "a": function() {},
    "b": function() {},
    // ...
}
```

**设置扩展**

```javascript
addExt(ext);
```

`ext`: 它是一个对象，像下面这样:

```javascript
{
    "fg": {
        "a": function(config, value, callback) {},
        "b": function(config, value, callback) {},
        // ...
    },
    "tg": {
        "c": function(config, value, callback) {},
        "d": function(config, value, callback) {},
        // ...
    },
    "pg": {
        "e": function(config, target, callback) {},
        "f": function(config, target, callback) {},
        // ...
    }
}
```

顾名思义, fg字段表示设置FormGenerator的扩展，tg字段表示设置TableGenerator的扩展，pg表示设置其他元素的扩展。关于扩展，可以在另外的文档中查阅相关内容。

**构建**

```javascript
build(config, [target,] callback);
```

`config`中需要一个字段`configList`表示一串配置.

`target`是一个可选参数，表示dom应该插入到何处，若不设置，会生成一个div元素，并以此作为target

**取得所有事件**

```javascript
getEvents()
```

见`setEvents(event)`.
