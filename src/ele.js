define(["./formgen/index", "./lib/jquery", "./helper/url", "./helper/ajax"], function(require, exports, module) {

    var FG = require("./formgen/index");
    var $ = require("./lib/jquery");
    var url = require("./helper/url");
    var ajax = require("./helper/ajax");

    var doc = document;

    // the implementation of form
    exports.form = function(config, parent, callback) {
        var form = doc.createElement("form");
        if (parent) {
            $(parent).append(form);
        }
        // if the data url is provided
        if (config.dataUrl) {
            ajax(config.dataUrl, url.getParameters(), function(ret) {
                buildForm(config, ret.data, form, parent ? null : callback);
            });
        } else {
            buildForm(config, {}, form, parent ? null : callback);
        }

        if (parent) {
            callback(null);
        }
    };

    // do the real build work
    var buildForm = function(config, value, form, callback) {
        var fg = new FG(config, value);
        fg.build(form, function(ret) {
            if (callback) {
                callback(form);
            }
        });
    };

});
