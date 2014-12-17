FormGenerator快速入门
====================

本组件使用了`seajs`作为模块化管理工具，所以页面中需要引入`seajs`。

### 演示

请看下面这个例子:

```html
<!-- seajs引入 -->
<script src="path/to/sea.js"></script>
<div id="container">
    <!-- 生成的form将会插入至此 -->
</div>
<script>
    // 表单配置
    var config = {
        fields: [
            {
                type: "hidden",
                name: "id",
            },
            {
                type: "text",
                name: "name",
                label: "用户名:",
                wrapper: "common"
            },
            {
                type: "text",
                name: "logo",
                label: "logo图:",
                wrapper: "common"
            }
        ],
        action: "account.json",
        method: "POST"
    };

    // 表单初始值
    var value = {
        id: 1,
        name: "hello",
        logo: "xxx.png"
    };

    // use我们提供的表单生成模块和jQuery
    seajs.use(['/path/to/formgen/index.js', '/path/to/jQuery'], function(FormGenerator, $) {
        var fg = new FormGenerator(config, value);
        // build方法接受一个回调函数作为参数，该回调函数的参数即生成的form
        fg.build(function(form) {
            $("#container").append(form);
        });
    });
</script>
```

### 结果

上面演示中将会生成如下这段代码:

```html
<form method="POST" action="account.json">
    <input type="hidden" name="id" value="1">

    <div class="formgen clearfix">
        <label class="formgen_label">用户名:</label>
        <div class="formgen_inputs">
            <input type="text" name="name">
            <p class="formgen_msg"></p>
        </div>
    </div>

    <div class="formgen clearfix">
        <label class="formgen_label">logo图:</label>
        <div class="formgen_inputs">
            <input type="text" name="logo">
            <p class="formgen_msg"></p>
        </div>
    </div>
</form>
```

**为什么上面的html结构是这个样子的?**

事实上，只有最核心的`input`结构不能修改，其他的html结构你完全可以自定义。目前的html结构是由`config`中的`wrapper`字段决定的，假如你想自定义html结构的话，完全没问题，只需将`wrapper`设置成`html`，并且指定你的模板文件位置即可。

为了达到和`common`一样的配置效果，我们可以写下面这个模板文件:

```html
<!-- mywrapper.tpl -->
<div class="formgen">
    <label class="formgen_label">{{label}}</label>
    <div class="formgen_inputs">
        {{{field}}}
        {{#if star}}
        <span class="formgen_star">*</span>
        {{/if}}
        {{#if tip}}
        <span class="formgen_tip">{{tip}}</span>
        {{/if}}
        {{#if msg}}
        <p class="formgen_msg"></p>
        {{/if}}
    </div>
</div>
```

然后将配置改成使用html作为wrapper:

```javascript
{
    fields: [
        {
            // ...
            wrapper: "html",
            wrapperPath: "path/to/template"
        }
    ]
}
```

**我可以配置提示吗?**

可以的，其实上面给出的这个模板就已经给出了一些提示了，你只需要在`config`中设置`tip`字段即可。不仅如此，你还可以针对必填项在输入框后加上一个`*`的提示。配置这些东西看起来就像这样:

```javascript
{
    fields: [
        {
            // ...
            star: true,
            tip: "你要注意这个哦"
        }
    ]
}
```
