FormGenerator表单验证
====================

作为一个表单生成工具，验证是不可或缺的一个功能，目前本组件只做了针对范围的检查，所谓范围，现在就是指类似一个输入框可以输多少个字，一个checkbox可以勾选多少个选项这种情形。

### 样例配置

```javascript
{
    fields: [
        {
            type: "text",
            required: true,
            requiredMsg: "此项必填",
            min: 4,
            minMsg: "不得少于4字",
            max: 10,
            maxMsg: "不得多于10字"
        }
    ]
}
```

上面这段配置给出了三个属性，首先是这个输入域是否必填(`required`)，当未输入内容时，就会提示`requiredMsg`指定的错误信息。另外两个属性也是类似的，`min`限定了字数下限，若不符合要求则提示`minMsg`指定的错误信息，`max`亦然。

### 如何扩展自己的验证

请参见如何扩展这一节。
