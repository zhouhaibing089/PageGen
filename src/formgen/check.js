/**
 * Created by zhb on 12/7/14.
 */
define(function(require, exports, module) {

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

        config = $.extend(config, defaultConfig);

        // if the target field does not provide the fg_size function
        if (field.fg_size === undefined) {
            return callback({ success: false, message: "未提供fg_size函数" });
        }
        var size = field.fg_size();

        if (size === 0) {
            if (config.required === true) {
                return callback({ success: false, message: config.requiredMsg });
            }
        }

        if (config.max !== undefined && config.max < size) {
            return callback({ success: false, message: config.maxMsg });
        }

        if (config.min !== undefined && config.min > size) {
            return callback({ success: false, message: config.minMsg });
        }

        return callback({ success: true });
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