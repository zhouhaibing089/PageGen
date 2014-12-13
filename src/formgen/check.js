/**
 * Created by zhb on 12/7/14.
 */
define(['../lib/jquery'], function(require, exports, module) {

    var $ = require('../lib/jquery');

    // the wrapper of callback function
    var cb = function(field, result, callback) {
        if (result.success === false) {
            field.fg_msg(result.message);
        }
        if (callback !== undefined) {
            callback(result);
        }
    };

    /*
     * range check
     */
    exports.fg_range = function(field, config, callback) {
        var defaultConfig = {
            required: true,
            requiredMsg: "此项必填",
            maxMsg: "范围太大",
            minMsg: "范围太小"
        };

        config = $.extend(defaultConfig, config);

        // if the target field does not provide the fg_size function
        if (field.fg_size === undefined) {
            cb(field, {
                    success: false,
                    message: "未提供fg_size函数"
                },
                callback);
            return;
        }
        var size = field.fg_size();

        if (size === 0) {
            if (config.required === true) {
                cb(field, {
                        success: false,
                        message: config.requiredMsg
                    },
                    callback);
                return;
            }
        }

        if (config.max !== undefined && config.max < size) {
            cb(field, {
                success: false,
                message: config.maxMsg
            }, callback);
            return;
        }

        if (config.min !== undefined && config.min > size) {
            cb(field, {
                success: false,
                message: config.minMsg
            }, callback);
            return;
        }

        cb(field, {
            success: true
        }, callback);
    };

    /*
     * pattern check
     */
    exports.fg_pattern = function(field, config, callback) {

    };

    /*
     * check the value provided is item url or not
     */
    exports.fg_itemUrl = function(field, config, callback) {

    };
});
