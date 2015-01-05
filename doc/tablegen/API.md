TableGenerator API文档
=====================

### TableGenerator

**构造函数**

```javascript
TableGenerator(config, value);
```

`config`: 配置项

`value`: 期望一个数组型的对象

**注册td的处理器**

```javascript
registerHandler(type, handler);
```

`type`: 字符串，表示是何类型

`handler`: 函数，它的函数签名应该是:

```javascript
function hName(config, value, callback) {
    // 读取配置，设置值，并将产生的td作为参数传给callback
}
```

### TableGenerator.prototype

**构建**

```javascript
build([table,] callback);
```

`table`: 一个DOM对象，可以指定插入到给定的table当中

`callback`: 函数，此回调函数的第一个参数是生成的table

**新增一行数据**

```javascript
append(value)
```

`value`: 一个对象，要新增到table中的值

**删除指定行的数据**

```javascript
remove(index)
```

`index`: 一个数值，表示第index行

**清除数据**

```javascript
clear()
```
