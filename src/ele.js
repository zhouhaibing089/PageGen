define(["./formgen/index", "./tablegen/index", "./lib/jquery", "./helper/url", "./helper/ajax"], function(require, exports, module) {

    var FG = require("./formgen/index");
    var TG = require("./tablegen/index");
    var $ = require("./lib/jquery");
    var url = require("./helper/url");
    var ajax = require("./helper/ajax");

    var doc = document;

    var events = {};

    exports.setEvents = function(evts) {
        events = evts;
        FG.setEvents(events);
        TG.setEvents(events);
    };

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
                callback(ret);
            }
        });
    };

    // the implementation of table
    exports.table = function(config, parent, callback) {
        var table = doc.createElement("table");
        if (parent) {
            $(parent).append(table);
        }
        if (config.dataUrl) {
            ajax(config.dataUrl, url.getParameters(), function(ret) {
                buildTable(config, ret.data, table, parent ? null : callback);
            });
        } else {
            buildTable(config, null, table, parent ? null : callback);
        }

        if (parent) {
            callback(null);
        }
    };

    // do the real build work
    var buildTable = function(config, listValue, table, callback) {
        var tg = new TG(config, listValue);
        tg.build(table, function(ret) {
            if (callback) {
                callback(ret);
            }
        });
    };

    // css does not need to be loaded asynchronously
    exports.css = function(config, parent, callback) {
        // the link tag should be inserted into head
        if (!Array.isArray(config)) {
            config = [config];
        }
        config.forEach(function(css) {
            var link = doc.createElement("link");
            link.href = css;
            link.rel = "stylesheet";
            if (parent) {
                $(parent).append(link);
            } else {
                doc.head.appendChild(link);
            }
        });
        callback(null);
    };
});
