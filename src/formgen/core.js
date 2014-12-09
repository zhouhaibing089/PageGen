/**
 * Created by zhb on 12/02/2014
 */
define(['util'], function(require, exports, module) {

    var util = require("util");

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

    // FGP variable
    var FGP = FG.prototype;

    /**
     * the first argument is the parent element where the generated form
     * will be inserted into. and the second argument is the callback function
     * when the build work is done.
     */
    FGP.build = function(p, callback) {
        var self = this;

        var form = doc.createElement("form");
        this.form = form;
        /* insert into dom */
        if (p) {
            $(p).append(form);
        }
        /* add form attributes */
        $(form).attr("id", this.config.formId).addClass(this.config.formClass)
            .attr("method", this.config.method).attr("action", this.config.action);

        // currently building field index
        var index = 0;
        // callback function when we build a field
        var cb = function(ele, config) {
            // no result
            if (ele === null) {
                return process(++index);
            }

            self.fields.push(ele);
            
            if (config.wrapper === undefined) {
                $(form).append(ele);
            } else {
                $(form).append(wrappers[config.wrapper](ele, config));
            }

            // go on with the next
            process(++index);
        };
        // build the given index-specified field
        var process = function(index) {
            // done
            if (index === self.config.fields.length) {
                if (callback !== undefined) {
                    callback(form);
                }
                return ;
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
        var data = {};

        this.fields.forEach(function(field) {
            if (field.fg_val === undefined) {
                return;
            }
            data[field.name] = field.fg_val();
        });

        data = $.extend(data, param);

        var self = this;

        $.ajax({
            "url": self.attr("action") ? self.attr("action") : location.href,
            "type": self.attr("method") ? self.attr("method") : "POST",
            "data": data,
            "cache": false,
            "success": function(data) {
                callback(data);
            },
            "error": function() {
                console.log("submit error");
            }
        });
    };

    /*
     * the check function
     */
    FGP.check = function(callback) {
        this.fields.forEach(function(field) {
            if (field != null) {
                field.fg_check(callback);
            }
        });
    };

    return FG;
});
