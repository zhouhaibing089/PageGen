/**
 * This module provide basic fields.
 *
 * Created by zhb on 2014/12/02
 */
define(['formgen/check'], function(require, exports, module) {
    // the formgen-check module
    var CHECK = require('formgen/check');

    // the alias of document
    var doc = document;

    /*
     * add the common attrbutes to the element
     */
    var addAttr = function(ele, cfg) {
        $(ele).attr("id", cfg.id).addClass(cfg["class"]).attr("type",
            cfg.type).attr("name", cfg.name);
    };

    exports.addAttr = addAttr;

    /*
     * set value, and set to be disabled when frozen is true
     *
     * the element needs to provide two functions, fg_val and fg_frozen
     */
    var setValue = function(ele, val, frozen) {
        if (val === null) {
            return ;
        }
        ele.fg_val(val);
        if (frozen === true) {
            ele.fg_frozen();
        }
    };

    exports.setValue = setValue;

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
        // the message function
        ret.fg_msg = function(message) {
            alert(message);
        };
        // set the attributes
        addAttr(ret, cfg);
        // set value
        setValue(ret, val, cfg.frozen);

        // trigger the check
        $(ret).focusout(function() {
            ret.check(function(result) {
                if (result.success === false) {
                    ret.fg_msg(result.message);
                }
            });
        });
        // restore the initial state
        $(ret).focusin(function() {
            ret.fg_msg("");
        });
        // the fg_size function used in fg_range check module
        ret.fg_size = function() {
            return $.trim($(ret).val()).length;
        };
        // the check function
        ret.fg_check = function(callback) {
            CHECK.fg_range(ret, cfg, callback);
        };
        // return
        callback(ret, cfg);
    };

    exports.select = function(cfg, val, callback) {
        var ret = doc.createElement("select");
        cfg.options.forEach(function(opt) {
            var option = doc.createElement("option");
            $(option).attr("value", opt.value).text(opt.text);
            $(ret).append(option);
        });
        ret.fg_val = function() {
            if (arguments.length > 0) {
                $(ret).val(arguments[0]);
            }
            return $(ret).val();
        };
        ret.fg_frozen = function() {
            $(ret).attr("disabled", true);
        };
        // set the attributes
        addAttr(ret, cfg);
        // set value
        setValue(ret, val, cfg.frozen);
        callback(ret, cfg);
    };

    exports.fg_val = function() {

    }
});
