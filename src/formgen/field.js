/**
 * This module provide basic fields.
 *
 * Created by zhb on 2014/12/02
 */
define(['../lib/jquery', './check', './field-util'], function(require, exports, module) {

    var $ = require("../lib/jquery");
    // the check module
    var check = require('formgen/check');
    // the field-util module
    var fieldUtil = require('formgen/field-util');

    // the alias of document
    var doc = document;

    var fg_alert_msg = function(message) {
        if (message) {
            alert(message);
        }
    };

    exports.fg_alert_msg = fg_alert_msg;

    // get text field
    exports.text = function(cfg, val, callback) {
        if (cfg.type === "textarea") {
            var ret = doc.createElement("textarea");
        } else {
            var ret = doc.createElement("input");
        }
        // set the attributes
        fieldUtil.addAttr(ret, cfg);
        // set value
        fieldUtil.setValue(ret, val, cfg.frozen);

        // the default message function
        ret.fg_msg = fg_alert_msg;

        // the fg_size function used in fg_range function
        ret.fg_size = function() {
            return $.trim($(ret).val()).length;
        };
        // the check function
        ret.fg_check = function(callback) {
            check.fg_range(ret, cfg, callback);
        };

        // trigger the check
        $(ret).focusout(function() {
            ret.fg_check();
        });
        // restore the initial state
        $(ret).focusin(function() {
            ret.fg_msg("");
        });
        // return
        callback(ret, cfg);
    };

    // get select field
    exports.select = function(cfg, val, callback) {
        var ret = doc.createElement("select");

        cfg.options.forEach(function(opt) {
            var option = doc.createElement("option");
            $(option).attr("value", opt.value).text(opt.text);
            $(ret).append(option);
        });

        // set the attributes
        fieldUtil.addAttr(ret, cfg);
        // set value
        fieldUtil.setValue(ret, val, cfg.frozen);

        callback(ret, cfg);
    };

    // get checkbox field
    exports.checkbox = function(cfg, val, callback) {
        var ret = doc.createElement("div");

        cfg.options.forEach(function(opt) {
            var label = doc.createElement("label");
            var input = doc.createElement("input");

            $(input).attr("type", "checkbox").val(opt.value).attr("name",
                cfg.name);

            $(ret).append($(label).append(input).append(opt.text));
        });

        // set the attributes
        fieldUtil.addAttr(ret, cfg);
        // the value function
        ret.fg_val = function() {
            // set value
            if (arguments.length > 0) {
                var arg = arguments[0];
                // uncheck all the value
                var inputs = $(ret).find('[name="' + cfg.name + '"]');
                inputs.attr("checked", false);
                // if the value is an Array
                if (Array.isArray(arg)) {
                    arg.forEach(function(val) {
                        inputs.filter(function() {
                            return this.value == val;
                        }).attr("checked", true);
                    });
                } else {
                    inputs.filter(function() {
                        return this.value == arg;
                    }).attr("checked", true);
                }
            }
            // get value
            var value = [];
            $(ret).find('[name="' + cfg.name + '"]').filter(function() {
                return this.checked == true;
            }).each(function() {
                value.push(this.value);
            });

            return value;
        };
        // the frozen function
        ret.fg_frozen = function() {
            $(ret).find('[name="' + cfg.name + '"]').attr("disabled", true);
        };
        // set the value
        fieldUtil.setValue(ret, val, cfg.frozen);

        ret.fg_msg = fg_alert_msg;
        // the fg_size function
        ret.fg_size = function() {
            return ret.fg_val().length;
        };
        // the check function
        ret.fg_check = function(callback) {
            check.fg_range(ret, cfg, callback);
        };
        // trigger the check
        $(ret).mouseleave(function() {
            ret.fg_check();
        });
        // reset to the initial state
        $(ret).mousemove(function() {
            ret.fg_msg("");
        });

        callback(ret, cfg);
    };

});
