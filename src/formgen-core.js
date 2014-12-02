/**
 * Created by zhb on 12/02/2014
 */
define(['util'], function(require, exports, module) {
    // the util module need to be executed
    require("util");

    // module variable
    /* extension point, produce inputs */
    var handlers = {};
    /* extension point, wrapper the produced inputs */
    var wrappers = {
        "none": function(ele, config) {
            return ele;
        }
    };

    var doc = document;


    // FG variable 
    var FG = function(config, value) {
        var args = arguments;
        this.config = args.length > 0 ? args[0] : {};
        this.value = args.length > 1 ? args[1] : {};
    };

    /* register a new handler for given type */
    FG.registerHandler = function(type, handler) {
        handlers[type] = handler;
    };

    /* register a new wrapper for given type */
    FG.registerWrapper = function(type, wrapper) {
        wrappers[type] = wrapper;
    }

    /*
     * add the common attrbutes to the element
     */
    FG.attr = function(ele, cfg) {
        ele.attr("id", cfg.id);
        ele.addClass(cfg["class"]);
        ele.attr("type", cfg.type);
        ele.attr("name", cfg.name);
    }

    /*
     * set value, and set to be disabled when frozen is true
     */
    FG.val = function(ele, val, frozen) {
        if (val === undefined) {
            return ;
        }
        ele.val(val);
        if (frozen === true) {
            ele.frozen();
        }
    }


    // FGP variable
    var FGP = FG.prototype;

    /**
     * the first argument is the parent element where the generated form
     * will be inserted into. and the second argument is the callback function
     * when the build work is done.
     */
    FGP.build = function(p, callback) {
        if (!(p instanceof jQuery)) {
            p = $(p);
        }
        
        var form = $(doc.createElement("form"));
        /* insert into dom */
        if (p) {
            p.append(form);
        }
        /* add form attributes */
        form.attr("id", this.config.formId);
        form.addClass(this.config.formClass);
        form.attr("method", this.config.method);
        form.attr("action", this.config.action);

        var index = 0;

        var cb = function(ele, config) {
            if (config.wrapper === undefined) {
                config.wrapper = "none";
            }
            form.append(wrappers[config.wrapper](ele, config));
            process(++index);
        };

        var that = this;

        var process = function(index) {
            // done
            if (index === that.config.inputs.length) {
                if (callback !== undefined) {
                    callback(form);
                }
                return ;
            }

            var input = that.config.inputs[index];
            handlers[input.type](input, that.value.get(input.name), cb);
        };

        process(index);
    };

    return FG;
});
