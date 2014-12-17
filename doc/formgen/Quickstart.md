FormGenerator快速入门
====================

本组建使用了`seajs`作为模块化管理工具，所以页面中需要引入`seajs`。

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
