define(['../lib/jquery'], function(require, exports, module) {

    var $ = require("../lib/jquery");

    exports.get = function(url, data, callback) {
        $.ajax({
            url: url,
            type: "GET",
            data: data,
            success: function(ret) {
                if (ret === false) {
                    alert("请求数据失败:" + url);
                    return;
                }
                if (ret.success !== undefined && ret.sucess === false) {
                    alert("请求数据失败:" + url);
                    return;
                }
                callback(ret);
            },
            fail: function() {
                alert("发送请求失败:" + url);
            }
        });
    };

    exports.post = function(url, data, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function(ret) {
                if (ret === false) {
                    alert("请求数据失败:" + url);
                    return;
                }
                if (ret.success !== undefined && ret.sucess === false) {
                    alert("请求数据失败:" + url);
                    return;
                }
                callback(ret);
            },
            fail: function() {
                alert("发送请求失败:" + url);
            }
        });
    };
});
