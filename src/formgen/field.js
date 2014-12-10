/**
 * This module provide basic fields.
 *
 * Created by zhb on 2014/12/02
 */
define(['formgen/check', 'formgen/field-util'], function(require, exports, module) {
    // the check module
    var check = require('formgen/check');
    // the field-util module
    var fieldUtil = require('formgen/field-util');

    // the alias of document
    var doc = document;

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
        ret.fg_msg = function(message) {
            if (message) {
                alert(message);
            }
        };

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


});
