define(function(require, exports, module) {
    // alias
    var doc = document;

    /**
     * the common wrapper
     *  <div class="formgen">
     *      <label class="formgen_label">{{label}}</label>
     *      <div class="formgen_inputs">
     *          {{inputs}}
     *          <p class="formgen_msg"></p>
     *      </div>
     *  </div>
     */
    exports.common = function(ele, config) {
        var defaultConfig = {
            msg: true
        };

        config = $.extend(config, defaultConfig);

        var mainDiv = doc.createElement("div");
        var fieldDiv = doc.createElement("div");

        $(fieldDiv).addClass("formgen_inputs").append(ele);

        if (config.label !== undefined) {
            var label = doc.createElement("label");
            $(mainDiv).append($(label).addClass("formgen_label").text(config.label));
        }

        if (config.msg === true) {
            var p = doc.createElement("p");
            $(fieldDiv).append($(p).addClass("formgen_msg"));

            ele.fg_msg = function() {
                if (arguments.length > 0) {
                    $(p).text(arguments[0]);
                }
                return $(p).text();
            };
        }

        return $(mainDiv).addClass("formgen clearfix").append(fieldDiv);
    };
});