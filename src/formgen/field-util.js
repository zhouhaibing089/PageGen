define(function(require, exports, module) {

    /*
     * add the common attrbutes to the element
     */
    exports.addAttr = function(field, cfg) {
        $(field).attr("id", cfg.id).addClass(cfg["class"]).attr("type",
            cfg.type).attr("name", cfg.name);
    };

    // set value for the given field
    exports.setValue = function(field, val, frozen) {
        if (val === null) {
            return ;
        }
        field.fg_val(val);
        if (frozen === true) {
            field.fg_frozen();
        }
    };

    // value function which can be delegate to jQuery
    var fg_$_val = function() {
        if (arguments.length > 0) {
            $(this).val(arguments[0]);
        }
        return $(this).val();
    };

    // the frozen function which is simply set the disabled to be true
    var fg_disable_frozen = function() {
        $(this).attr("disabled", true);
    };

    // the message function which is simply alert it
    var fg_alert_msg = function(message) {
        alert(message);
    };

    // add functions on the given field
    exports.addFuncs = function(field, funcs) {
        var defFuncs = {
            fg_val: fg_$_val,
            fg_frozen: fg_disable_frozen,
            fg_msg: fg_alert_msg
        };

        funcs = $.extend(defFuncs, funcs);

        field.fg_val = funcs.fg_val;
        field.fg_frozen = funcs.fg_frozen;
        field.fg_msg = funcs.fg_msg;
    };
});
