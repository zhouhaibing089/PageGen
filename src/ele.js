define(["./formgen/index", "./tablegen/index", "./lib/jquery", "./helper/url", "./helper/ajax", "./lib/handlebars"], function(require, exports, module) {

    var FG = require("./formgen/index");
    var TG = require("./tablegen/index");
    var $ = require("./lib/jquery");
    var url = require("./helper/url");
    var ajax = require("./helper/ajax");
    var Handlebars = require("./lib/handlebars");

    var doc = document;

    var events = {};

    exports.setEvents = function(evts) {
        for (var m in evts) {
            events[m] = evts[m];
        }
        FG.setEvents(evts);
        TG.setEvents(evts);
    };

    // add extension
    exports.addExt = function(extension) {
        var type;
        for (type in extension.fg) {
            FG.registerHandler(type, extension.fg[type]);
        }
        for (type in extension.tg) {
            TG.registerHandler(type, extension.tg[type]);
        }
        for (type in extension) {
            if (type === "fg" || type === "tg") {
                continue;
            }
            exports[type] = extension[type];
        }
    };

    // the implementation of form
    exports.form = function(config, parent, callback) {
        var form = doc.createElement("form");
        if (parent) {
            $(parent).append(form);
        }
        // if the data url is provided
        if (config.dataUrl) {
            ajax.get(config.dataUrl, url.getParameters(), function(ret) {
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
            ajax.get(config.dataUrl, url.getParameters(), function(ret) {
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
        config.files.forEach(function(css) {
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

    // for js, the file need to be loaded by order
    exports.js = function(config, parent, callback) {
        var files = config.files;

        var load = function(index) {
            if (index === files.length) {
                callback(null);
                return;
            }

            var cb = function() {
                load(++index);
            };

            var script = doc.createElement("script");
            var supportOnload = "onload" in script;
            if (supportOnload) {
                script.onload = cb;
            } else {
                script.onreadystatechange = function() {
                    if (/loaded|complete/.test(script.readyState)) {
                        cb();
                    }
                };
            }

            script.async = true;
            script.src = files[index];
            doc.head.appendChild(script);
        };

        load(0);
    };


    // directly use html template
    exports.html = function(config, parent, callback) {
        if (config.dataUrl) {
            ajax(config.dataUrl, url.getParameters(), function(ret) {
                buildHtml(config, ret.data, parent, callback);
            });
        } else {
            buildHtml(config, null, parent, callback);
        }
    };

    // build the html
    var buildHtml = function(config, value, parent, callback) {
        config = $.extend({compile: true}, config);
        ajax.get(config.htmlPath, function(html) {
            var result;
            if (config.compile) {
                var template = Handlebars.compile(html);
                result = $(template({
                    config: config,
                    value: value
                }));
            } else {
                result = html;
            }
            if (parent) {
                $(parent).append(result);
                callback(null);
            } else {
                callback(result);
            }
        });
    };
});
