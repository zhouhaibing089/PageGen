FormGenerator
=============

### 背景

随着业务发展，后台模型会渐趋稳定，所谓稳定就是说我们后台需要存储的数据字段基本不会发生太大变化了，举个例子来说，我们业务要求存储一部分账户信息，这些账户信息在不同业务场景下会有不同的使用方式，于是我们设计了这样一张表:

|name       |logo       |weight     |ext_attr       |
|-----------|-----------|-----------|---------------|
|hello      |xxx.png    |15         |{"age":10}     |

### 问题

假如业务A只关心`name`和`logo`字段，那么很有可能的是我们需要写下面这样一段html代码。

```html
<form action="/account.json?cmd=create" method="post">
    <label>用户名:</label>
    <input name="name"><br />

    <label>用户logo:</label>
    <input name="logo"><br />

    <input type="submit" value="保存">
</form>
```

不久之后我们又来了个业务B，它关心的字段是`name`，`weight`和`age`，于是我们又需要写下面这样一段html代码。

```html
<form action="/account.json?cmd=create" method="post">
    <label>用户名:</label>
    <input name="name"><br />

    <label>权重:</label>
    <input name="weight"><br />

    <label>年龄:</label>
    <input name="extAttr.age"><br />

    <input type="submit" value="保存">
</form>
```

现在问题就来了，在面对后续业务时我们就需要写大量这样的html代码，十分无趣且要花不少时间。

### 解决方案

后端解决这个问题很简单，只需从request拿出所有需要的参数，直接全部存储到数据库中即可。

前端这个问题就不是那么好解决，因为每增加一个业务，跟随而来的就是有可能要改一遍需要编辑的字段，并且不可避免的是需要再走一遍发布流程(开发，测试等)。

那么我们再仔细思考下这个问题，关键之处在于我们不希望总是写这样一段十分类似的html代码，并且还要麻烦地再走一遍流程。诚然，我们可以将这样一份表单代码存储在数据库中，然后根据不同的业务场景来取出这份代码，但是问题并不是这么简单。

因为对于表单来说，**编辑**和**验证**是两个必不可少的功能。
