/**
 * This module provide basic fields.
 *
 * Created by zhb on 2014/12/02
 */
define(['formgen/check'], function(require, exports, module) {
    // the formgen-check module
    var check = require('formgen/check');

    // the alias of document
    var doc = document;

    /*
     * add the common attrbutes to the element
     */
    exports.attr = function(ele, cfg) {
        $(ele).attr("id", cfg.id).addClass(cfg["class"]).attr("type",
            cfg.type).attr("name", cfg.name);
    }

    /*
     * set value, and set to be disabled when frozen is true
     *
     * the element needs to provide two functions, fg_val and fg_frozen
     */
    exports.val = function(ele, val, frozen) {
        if (val === null) {
            return ;
        }
        ele.fg_val(val);
        if (frozen === true) {
            ele.fg_frozen();
        }
    }

    // get text input
    exports.text = function(cfg, val, callback) {
        if (cfg.type === "textarea") {
            var ret = doc.createElement("textarea");
        } else {
            var ret = doc.createElement("input");
        }
        // set the frozen function
        ret.fg_frozen = function() {
            $(ret).attr("disabled", true);
        };
        // set the value function
        ret.fg_val = function() {
            if (arguments.length > 0) {
                $(ret).val(arguments[0]);
            }
            return $(ret).val();
        };
        // set the attributes
        this.attr(ret, cfg);
        // set value
        this.val(ret, val, cfg.frozen);
        // return
        callback(ret, cfg);
    };

    exports.select = function(cfg, val, callback) {
        var ret = doc.createElement("select");

        callback(ret, cfg);
    };
});
