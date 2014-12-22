/**
 * Created by zhb on 12/02/2014
 */
define(['../lib/jquery'], function(require, exports, module) {

    var $ = require("../lib/jquery");

    // module variable
    /* extension point, produce fields */
    var handlers = {};
    /* extension point, wrapper the produced fields */
    var wrappers = {};

    var doc = document;

    // FG variable
    var FG = function(config, value) {
        var args = arguments;
        this.config = args.length > 0 ? args[0] : {};
        this.value = args.length > 1 ? args[1] : {};

        // the fields
        this.fields = [];
    };

    /* register a new handler for given type */
    FG.registerHandler = function(type, handler) {
        handlers[type] = handler;
    };

    /* register a new wrapper for given type */
    FG.registerWrapper = function(type, wrapper) {
        wrappers[type] = wrapper;
    };

    /* if you just want to generate a single field */
    FG.build = function(config, value, callback) {
        // avoid the undefined is not a function
        if (callback === undefined) {
            callback = function() {};
        }
        // if the config is null
        if (!config) {
            callback(null);
            return;
        }
        // the handler function
        var handler = handlers[config.type];
        // if no handler
        if (!handler) {
            callback(null);
            return;
        }
        // get it
        handler(config, value, function(field, config) {
            // no result
            if (field === null) {
                callback(null);
            }
            // the wrapper function
            var wrapper = wrappers[config.wrapper];

            if (wrapper === undefined) {
                callback(field);
            } else {
                wrapper(field, config, function(result) {
                    if (result !== false) {
                        callback(result);
                    } else {
                        callback(field);
                    }
                });
            }
        });
    };

    // FGP variable
    var FGP = FG.prototype;

    /**
     * the first argument is the parent element where the generated form
     * will be inserted into. and the second argument is the callback function
     * when the build work is done.
     */
    FGP.build = function(form, callback) {
        var self = this;

        // if only one parameter is provided
        if (typeof(form) === "function") {
            callback = form;
            form = null;
        }

        if (form === null) {
            form = doc.createElement("form");
        }
        this.form = form;
        form._fg = this;
        /* add form attributes */
        $(form).attr("id", this.config.id).addClass(this.config["class"])
            .attr("method", this.config.method).attr("action", this.config.action);

        // currently building field index
        var index = 0;
        // callback function when we build a field
        var cb = function(field, config) {
            // no result
            if (field === null) {
                return process(++index);
            }

            self.fields.push(field);

            // the wrapper function
            var wrapper = wrappers[config.wrapper];

            if (wrapper === undefined) {
                $(form).append(field);
                process(++index);
            } else {
                wrapper(field, config, function(result) {
                    if (result !== false) {
                        $(form).append(result);
                    }
                    process(++index);
                });
            }
        };
        // build the given index-specified field
        var process = function(index) {
            // done
            if (index === self.config.fields.length) {
                if (callback !== undefined) {
                    callback(form);
                }
                return;
            }

            var field = self.config.fields[index];
            var handler = handlers[field.type];

            if (handler === undefined) {
                cb(null, field);
            } else {
                handlers[field.type](field, self.value.get(field.name), cb);
            }
        };

        process(index);
    };

    /**
     * the submit function, the first parameter is the extra parameters,
     * the second parameter is the callback function after submit.
     */
    FGP.submit = function(param, callback) {
        if (typeof(param) === "function") {
            callback = param;
            param = {};
        }

        var data = {};

        this.fields.forEach(function(field) {
            if (field.fg_val === undefined) {
                return;
            }
            var name = $(field).attr("name");
            data[name] = field.fg_val();
        });

        data = $.extend(param, data);

        var form = $(this.form);

        $.ajax({
            "url": form.attr("action") ? form.attr("action") : location.href,
            "type": form.attr("method") ? form.attr("method") : "POST",
            "data": data,
            "cache": false,
            "success": function(data) {
                if (callback !== undefined) {
                    callback(data);
                }
            },
            "error": function() {
                alert("submit error");
            }
        });
    };

    /*
     * the check function
     */
    FGP.check = function(callback) {
        var self = this;
        var pass = true;
        var index = 0;

        // to avoid `undefined is not a function problem`
        if (callback === undefined) {
            callback = new Function();
        }

        var cb = function(message) {
            if (message.success === false) {
                pass = false;
            }
            check(++index);
        };

        var check = function(index) {
            // done
            if (index === self.fields.length) {
                callback(pass);
                return;
            }
            var field = self.fields[index];
            if (field && field.fg_check) {
                self.fields[index].fg_check(cb);
            } else {
                cb({
                    success: true
                });
            }
        };

        check(0);
    };

    // clear old value
    FGP.clearValue = function() {
        this.fields.forEach(function(field) {
            field.fg_val(null);
        });
    };

    // set new value
    FGP.setValue = function(value) {
        this.fields.forEach(function(field) {
            field.fg_val(value.get($(field).attr("name")));
        });
    };

    return FG;
});
