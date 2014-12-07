define(['formgen/core'], function(require, exports, module) {
    var FG = require('formgen/core');
    // alias
    var doc = document;
    
    // register wrapper
    FG.registerWrapper("common", common);

    /**
     * the common wrapper
     *  <div class="formgen">
     *      <div class="formgen_label">{{label}}</div>
     *      <div class="formgen_inputs">
     *          {{inputs}}
     *          <p class="formgen_msg"></p>
     *      </div>
     *  </div>
     */
    function common(ele, config) {
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
    }
});