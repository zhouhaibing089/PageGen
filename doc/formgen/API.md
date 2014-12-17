FormGenerator API文档
====================

### FormGenerator

**构造函数**

```javascript
function FormGenerator(config, value) {}
```

第一个参数是配置，第二个参数是默认的表单值。都是可选参数，如果不给，或者给`null`，都将获得默认值`{}`。

**生成单个输入域**

```javascript
function build(config, value, callback) {}
```

这里的`config`指的是单个域的配置，`value`也是指单个域的值，`callback`指定生成后的回调函数，回调函数接收一个参数，即生成的输入域。

样例:

```javascript
FormGeneraotr.build({
        type: "hidden",
        name: "id"
    }, 56, function(field) {
        // 对field进行操作
    });
```

**注册输入域类型**

```javascript
function registerHandler(type, handler) {}
```

现有的输入类型可能不满足你的需求，这时你就可以自行实现一个新类型，此处可参见如何扩展这一节。

**注册html结构类型**

```javascript
function registerWrapper(type, wrapper) {}
```

现有的html结构也有可能不满足你的需求，这时你可以自行实现一个新的wrapper，此处可参见如何扩展这一节。

### FormGenerator.prototype

**构建表单**

```javascript
function build([form, ]callback) {}
```

这个方法是核心，即执行实际的构建工作，如果你已经有一个`form`对象，你可以将其作为第一个参数，这样的话，生成的所有输入域都会添加至你给定的`form`元素中，当然你也可以直接给回调函数，该回调函数的第一个参数即生成的form元素。

**提交表单**

```javascript
function submit([param, ]callback) {}
```

第一个可选参数是你希望额外添加的payload，即除了表单里的数据外，你还希望提交额外的内容。你可以指定回调函数来处理提交后的返回结果，也就是说该回调函数的参数便是服务器端返回的数据。

**验证表单**

```javascript
function check(callback) {}
```

验证所有的输入域是否都OK了，参数里给定的回调函数会接受一个参数表示验证结果(`true`或者`false`)。
