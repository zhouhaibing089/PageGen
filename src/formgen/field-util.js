define(function(require, exports, module) {

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

    /*
     * add the common attrbutes to the element
     */
    exports.addAttr = function(field, cfg) {
        $(field).attr("id", cfg.id).addClass(cfg["class"]).attr("type",
            cfg.type).attr("name", cfg.name);
    };

    // set value for the given field
    exports.setValue = function(field, val, frozen) {
        // before set value
        if (field.fg_val === undefined) {
            field.fg_val = fg_$_val;
        }
        if (field.fg_frozen === undefined) {
            field.fg_frozen = fg_disable_frozen;
        }

        if (val === null) {
            return;
        }
        field.fg_val(val);
        if (frozen === true) {
            field.fg_frozen();
        }
    };
});
