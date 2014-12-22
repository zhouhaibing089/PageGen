/*
* Create by zhb on 12/22/2014
*/
define(["./lib/jquery", "./helper/lang", "./helper/url"], function(require, exports, module) {

    var $ = require("./lib/jquery");
    require("./helper/lang").addMethod();
    var url = require("./helper/url");

    var doc = document;

    // the handler to build page
    var handlers = {};

    // the default configuration
    var config = {
        "configUrl": "/pageConfig.json"
    };

    var PageGen = function(config) {
        this.config = config;
    };

    // register a new handler
    exports.registerHandler = function(type, handler) {
        handlers[type] = handler;
    };

    // configuration the PageGenerator
    exports.config = function(cfg) {
        config = $.extend(config, cfg);
    };

    // load configuration, the callback use the result as parameter
    exports.loadConfig = function(callback) {
        var data = url.getParameters();

        if (callback === undefined) {
            callback = function() {};
        }

        // ajax the configuration
        $.ajax({
            url: config.configUrl,
            type: "GET",
            data: data,
            success: function(ret) {
                callback(ret);
            },
            fail: function() {
                callback(false);
            }
        });
    };

    // build the page
    exports.build = function(config, target, callback) {
        // If the second argument is a function
        if (typeof(target) === "function") {
            callback = target;
            target = null;
        }
        // if no target
        if (target === null) {
            target = doc.createElement("div");
        }
        // assign a default value for callback
        if (!callback) {
            callback = function() {};
        }
        // add id and class if needed
        $(target).attr("id", config.id).addClass(config["class"]);
        // if there is no config
        if (!config.configList) {
            callback(target);
            return;
        }

        var index = 0;

        // the callback function
        var cb = function(ele) {
            if (ele) {
                $(target).append(ele);
            }
            process(++index);
        };
        // the process function
        var process = function(index) {
            if (index === config.configList.length) {
                callback(target);
                return;
            }
            var eleConfig = config.configList[index];
            var handler = handlers[eleConfig.type];
            // if no such handler
            if (!handler) {
                cb(null);
                return;
            }
            // build it
            handler(eleConfig, target, function(ele) {
                cb(ele);
            });
        };

        process(0);
    };
});
